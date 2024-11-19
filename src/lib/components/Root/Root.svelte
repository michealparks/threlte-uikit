<script lang="ts">
  import {
    DEFAULT_PIXEL_SIZE,
    type RootProperties,
    createRoot,
    readReactive,
    reversePainterSortStable,
  } from '@pmndrs/uikit/internals'
  import { Group } from 'three'
  import { T, useThrelte, useTask, currentWritable } from '@threlte/core'
  import { type Signal, computed, signal } from '@preact/signals-core'

  import { createParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { useInternals } from '$lib/useInternals'
  import AddHandlers from '../AddHandlers.svelte'
  import type { Props } from './Root.svelte'

  type $$Props = Props

  export let pixelSize: Props['pixelSize'] = undefined
  export let name: Props['name'] = undefined

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

  export let ref: Props['ref'] = undefined
  ref = useInternals(internals, style, internals.root.pixelSize)

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

  const internalsHandlers = internals.handlers
  $: handlers = $internalsHandlers
</script>

<AddHandlers
  ref={$outerRef}
  userHandlers={props}
  handlers={{
    onclick: handlers.onClick,
    oncontextmenu: handlers.onContextMenu,
    ondblclick: handlers.onDoubleClick,
    onpointercancel: handlers.onPointerCancel,
    onpointerdown: handlers.onPointerDown,
    onpointerenter: handlers.onPointerEnter,
    onpointerleave: handlers.onPointerLeave,
    onpointermissed: handlers.onPointerMissed,
    onpointermove: handlers.onPointerMove,
    onpointerout: handlers.onPointerOut,
    onpointerover: handlers.onPointerOver,
    onpointerup: handlers.onPointerUp,
  }}
>
  <T is={internals.interactionPanel} />
  <T
    matrixAutoUpdate={false}
    is={$innerRef}
  >
    <slot />
  </T>
</AddHandlers>
