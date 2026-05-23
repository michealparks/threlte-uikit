<script lang="ts">
  import type { InputProperties } from '@pmndrs/uikit-horizon'
  import type { Object3DEventMap } from 'three'

  import { HorizonInput as HorizonInputVanilla } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  type HorizonInputProperties = InputProperties

  interface Props extends WithoutUikitHandlers<HorizonInputProperties>, EventHandlers {
    ref?: InstanceType<typeof HorizonInputVanilla>
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new HorizonInputVanilla(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function forwardPointer(type: string, event: any) {
    component.input.dispatchEvent({
      type: type as keyof Object3DEventMap,
      pointerId: event.nativeEvent.pointerId,
      point: event.point,
      uv: event.uv,
      object: event.object,
      nativeEvent: event.nativeEvent,
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
  onpointerenter={handlers.current.onpointerenter}
  onpointerout={handlers.current.onpointerout}
  onpointerover={handlers.current.onpointerover}
  onwheel={handlers.current.onwheel}
  onpointerdown={(event) => {
    handlers.current.onpointerdown?.(event)
    forwardPointer('pointerdown', event)
  }}
  onpointermove={(event) => {
    handlers.current.onpointermove?.(event)
    forwardPointer('pointermove', event)
  }}
  onpointerup={(event) => {
    handlers.current.onpointerup?.(event)
    forwardPointer('pointerup', event)
  }}
  onpointerleave={(event) => {
    handlers.current.onpointerleave?.(event)
    forwardPointer('pointerleave', event)
  }}
  onpointercancel={(event) => {
    handlers.current.onpointercancel?.(event)
    forwardPointer('pointercancel', event)
  }}
/>
