<script lang="ts">
  import type { TextareaProperties } from '@pmndrs/uikit-default'
  import type { Object3DEventMap } from 'three'

  import { Textarea as KitTextareaVanilla } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  type KitTextareaProperties = TextareaProperties

  interface Props extends WithoutUikitHandlers<KitTextareaProperties>, EventHandlers {
    ref?: KitTextareaVanilla
  }

  let { ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new KitTextareaVanilla(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function forward(type: string, event: any) {
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
  oncontextmenu={handlers.current.oncontextmenu}
  ondblclick={handlers.current.ondblclick}
  onpointerenter={handlers.current.onpointerenter}
  onpointerout={handlers.current.onpointerout}
  onpointerover={handlers.current.onpointerover}
  onwheel={handlers.current.onwheel}
  onclick={() => component.input.focus()}
  onpointerdown={(event) => forward('pointerdown', event)}
  onpointermove={(event) => forward('pointermove', event)}
  onpointerup={(event) => forward('pointerup', event)}
  onpointerleave={(event) => forward('pointerleave', event)}
  onpointercancel={(event) => forward('pointercancel', event)}
/>
