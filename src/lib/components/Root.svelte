<script lang="ts">
  import { Group } from 'three'
  import { T, useThrelte, useTask, currentWritable } from '@threlte/core'
  import { type Signal, computed, signal } from '@preact/signals-core'
  import {
    DEFAULT_PIXEL_SIZE,
    type EventHandlers,
    type RootProperties,
    type WithReactive,
    createRoot,
    readReactive,
    reversePainterSortStable,
  } from '@pmndrs/uikit/internals'
  import { createParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { useInternals, type RootRef } from '$lib/useInternals'
  import AddHandlers from './AddHandlers.svelte'

  type $$Props = RootProperties &
    WithReactive<{ pixelSize?: number }> & {
      ref?: RootRef
      name?: string
    } & EventHandlers

  export let pixelSize: $$Props['pixelSize'] = undefined
  export let name: $$Props['name'] = undefined

  const { camera, renderer, shouldRender, scheduler, renderStage, invalidate } = useThrelte()

  // @TODO(mp) Remove optional once @threlte/test supports webgl2 context mocking.
  renderer.setTransparentSort?.(reversePainterSortStable)
  renderer.localClippingEnabled = true

  const onFrameSet = new Set<(delta: number) => void>()

  let whileOnFrameRef = false

  let outerRef = currentWritable(new Group())
  let innerRef = currentWritable(new Group())

  const { style, properties, defaults } = usePropertySignals<RootProperties>()
  $: props = { ...$$restProps }
  $: properties.value = props

  const pixelSizeSignal = signal<Signal<number | undefined> | number | undefined>(undefined)
  $: pixelSizeSignal.value = pixelSize

  const internals = createRoot(
    computed(() => readReactive(pixelSizeSignal.value) ?? DEFAULT_PIXEL_SIZE),
    style,
    properties,
    defaults,
    outerRef,
    innerRef,
    () => camera.current,
    renderer,
    onFrameSet,
    () => {
      if (whileOnFrameRef) {
        // request render unnecassary -> already rendering
        return
      }

      // not rendering -> requesting a new frame
      invalidate()
    },
    // requestFrame = invalidate, because invalidate always causes another frame
    invalidate
  )
  $: internals.interactionPanel.name = name ?? ''

  export let ref = useInternals(internals, style, internals.root.pixelSize)

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

  createParent(internals)
</script>

<AddHandlers
  userHandlers={props}
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
