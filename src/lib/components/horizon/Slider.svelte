<script lang="ts">
  import type { SliderProperties } from '@pmndrs/uikit-horizon'
  import type { Object3DEventMap } from 'three'

  import { Slider } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<SliderProperties>, EventHandlers {
    ref?: Slider
    onvaluechange?: SliderProperties['onValueChange']
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Slider(undefined, undefined, { renderContext })

  const { handlers, disableControls, enableControls } = build(component, () => rest)

  // Threlte 8 calls registered handlers directly rather than via Object3D.dispatchEvent,
  // so the Slider's internal abortableEffect listeners never fire on their own.
  // We bridge the gap by forwarding events via dispatchEvent so the built-in
  // drag logic (worldToLocal value calculation, uncontrolledSignal, onValueChange) works.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function forward(type: string, event: any) {
    if (type === 'pointerdown') disableControls()
    else if (type === 'pointerup') enableControls()
    component.dispatchEvent({
      type: type as keyof Object3DEventMap,
      pointerId: event.nativeEvent.pointerId,
      point: event.point,
      stopPropagation: event.stopPropagation,
    })
  }
</script>

<T
  bind:ref
  is={component}
  onclick={handlers.current.onclick}
  oncontextmenu={handlers.current.oncontextmenu}
  ondblclick={handlers.current.ondblclick}
  onpointercancel={handlers.current.onpointercancel}
  onpointerenter={handlers.current.onpointerenter}
  onpointerleave={handlers.current.onpointerleave}
  onpointerout={handlers.current.onpointerout}
  onpointerover={handlers.current.onpointerover}
  onwheel={handlers.current.onwheel}
  onpointerdown={(event) => forward('pointerdown', event)}
  onpointermove={(event) => forward('pointermove', event)}
  onpointerup={(event) => forward('pointerup', event)}
/>
