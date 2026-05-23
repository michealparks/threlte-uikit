<script lang="ts">
  import type { DropdownProperties } from '@pmndrs/uikit-horizon'
  import type { Snippet } from 'svelte'

  import { Dropdown } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<DropdownProperties>, EventHandlers {
    ref?: Dropdown
    children?: Snippet
    onvaluechange?: DropdownProperties['onValueChange']
    onopenchange?: DropdownProperties['onOpenChange']
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Dropdown(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function forwardClick(event: any) {
    component.dispatchEvent({
      type: 'click',
      point: event.point,
      uv: event.uv,
      object: event.object,
      nativeEvent: event.nativeEvent,
      stopPropagation: event.stopPropagation,
      distance: event.distance,
    })
  }
</script>

<T
  bind:ref
  is={component}
  oncontextmenu={handlers.current.oncontextmenu}
  ondblclick={handlers.current.ondblclick}
  onpointercancel={handlers.current.onpointercancel}
  onpointerdown={handlers.current.onpointerdown}
  onpointerenter={handlers.current.onpointerenter}
  onpointerleave={handlers.current.onpointerleave}
  onpointermove={handlers.current.onpointermove}
  onpointerout={handlers.current.onpointerout}
  onpointerover={handlers.current.onpointerover}
  onpointerup={handlers.current.onpointerup}
  onwheel={handlers.current.onwheel}
  onclick={(event) => forwardClick(event)}
>
  {@render children?.()}
</T>
