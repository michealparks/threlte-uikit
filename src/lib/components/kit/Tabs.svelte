<script lang="ts">
  import type { TabsProperties } from '@pmndrs/uikit-default'
  import type { Snippet } from 'svelte'

  import { Tabs } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<TabsProperties>, EventHandlers {
    ref?: Tabs
    children?: Snippet
    onvaluechange?: TabsProperties['onValueChange']
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new Tabs(undefined, undefined, { renderContext })

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
