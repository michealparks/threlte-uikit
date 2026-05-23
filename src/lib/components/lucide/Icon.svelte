<script lang="ts">
  import type { Svg, SvgProperties } from '@pmndrs/uikit'

  import { T } from '@threlte/core'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type IconConstructor = new (...args: any[]) => Svg

  interface Props extends WithoutUikitHandlers<SvgProperties>, EventHandlers {
    is: IconConstructor
    ref?: Svg
  }

  let { is: IconClass, ref = $bindable(), ...rest }: Props = $props()

  const renderContext = useRenderContext()
  const component = $derived(new IconClass(undefined, undefined, { renderContext }))

  const { handlers } = $derived(build(component, () => rest))
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
/>
