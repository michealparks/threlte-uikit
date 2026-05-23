<script lang="ts">
  import type { DropdownIconProperties } from '@pmndrs/uikit-horizon'
  import type { Snippet } from 'svelte'

  import { DropdownIcon } from '@pmndrs/uikit-horizon'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<DropdownIconProperties>, EventHandlers {
    ref?: DropdownIcon
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new DropdownIcon(undefined, undefined, { renderContext })

  const { handlers } = build(component, () => rest)
</script>

<T
  bind:ref
  is={component}
  onclick={handlers.current.onclick}
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
>
  {@render children?.()}
</T>
