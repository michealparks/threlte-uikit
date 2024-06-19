<script lang="ts">
  import { T } from '@threlte/core'
  import { type Signal, computed, signal } from '@preact/signals-core'
  import { useThrelte, useTask, currentWritable } from '@threlte/core'
  import AddHandlers from './AddHandlers.svelte'
  import {
    DEFAULT_PIXEL_SIZE,
    type EventHandlers,
    type RootProperties,
    type WithReactive,
    createRoot,
    readReactive,
    reversePainterSortStable,
  } from '@pmndrs/uikit/internals'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { Group } from 'three'
  import { createParent } from '$lib/useParent'
  import { useInternals } from '$lib/useInternals'

  type $$Props = RootProperties &
    WithReactive<{ pixelSize?: number }> & {
      ref?: ReturnType<typeof createRoot>
      name?: string
      pixelSize?: number
    } & EventHandlers

  export let pixelSize: $$Props['pixelSize'] = undefined
  export let name: $$Props['name'] = undefined

  const { camera, renderer, shouldRender, scheduler, renderStage, invalidate } = useThrelte()

  renderer.setTransparentSort(reversePainterSortStable)

  const onFrameSet = new Set<(delta: number) => void>()

  let whileOnFrameRef = false

  let outerRef = currentWritable(new Group())
  let innerRef = currentWritable(new Group())

  const propertySignals = usePropertySignals($$restProps)
  $: propertySignals.properties.value = $$restProps

  const pixelSizeSignal = signal<Signal<number | undefined> | number | undefined>(undefined)
  $: pixelSizeSignal.value = pixelSize

  const internals = createRoot(
    computed(() => readReactive(pixelSizeSignal.value) ?? DEFAULT_PIXEL_SIZE),
    propertySignals.style,
    propertySignals.properties,
    propertySignals.default,
    outerRef,
    innerRef,
    () => camera.current,
    renderer,
    onFrameSet,
    () => {
      if (whileOnFrameRef) {
        //request render unnecassary -> already rendering
        return
      }
      //not rendering -> requesting a new frame
      invalidate()
    },
    //requestFrame = invalidate, because invalidate always causes another frame
    invalidate
  )
  $: internals.interactionPanel.name = name ?? ''

  export const ref = internals

  useTask(
    (delta) => {
      if (shouldRender()) {
        whileOnFrameRef = true
        for (const onFrame of onFrameSet) {
          onFrame(delta)
        }
        whileOnFrameRef = false
      }
    },
    {
      autoInvalidate: false,
      stage: scheduler.createStage(Symbol('uikit-stage'), { before: renderStage }),
    }
  )

  useInternals(internals)

  createParent(internals)
</script>

<AddHandlers
  userHandlers={$$restProps}
  handlers={internals.handlers}
  ref={$outerRef}
>
  <T is={internals.interactionPanel} />
  <T
    matrixAutoUpdate={false}
    is={$innerRef}
  >
    <slot />
  </T>
</AddHandlers>
