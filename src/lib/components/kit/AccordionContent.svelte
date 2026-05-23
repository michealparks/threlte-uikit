<script lang="ts">
  import type { AccordionContentProperties } from '@pmndrs/uikit-default'
  import type { Snippet } from 'svelte'

  import { AccordionContent } from '@pmndrs/uikit-default'
  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props
    extends WithoutUikitHandlers<AccordionContentProperties>, EventHandlers {
    ref?: AccordionContent
    children?: Snippet
  }

  let { ref = $bindable(), children, ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = new AccordionContent(undefined, undefined, {
    renderContext,
    defaultOverrides: {},
  })

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
