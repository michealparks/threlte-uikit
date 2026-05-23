<script lang="ts">
  import type { Snippet } from 'svelte'

  import {
    type FullscreenProperties,
    Fullscreen as VanillaFullscreen,
  } from '@pmndrs/uikit'
  import { T, useThrelte } from '@threlte/core'
  import { Object3D, type OrthographicCamera, type PerspectiveCamera } from 'three'

  import type { EventHandlers, WithoutUikitHandlers } from '$lib/Events.js'

  import { build, useRenderContext } from '$lib/build.svelte'

  interface Props extends WithoutUikitHandlers<FullscreenProperties>, EventHandlers {
    ref?: VanillaFullscreen
    camera?: PerspectiveCamera | OrthographicCamera
    children?: Snippet
  }

  let { ref = $bindable(), camera: userCamera, children, ...rest }: Props = $props()

  const { camera: defaultCamera, renderer } = useThrelte()
  const renderContext = useRenderContext()
  const component = new VanillaFullscreen(renderer, undefined, undefined, {
    renderContext,
  })
  const { handlers } = build(component, () => rest)

  const wrapper = new Object3D()
  const camera = $derived(userCamera ?? $defaultCamera)
</script>

<T
  is={wrapper}
  attach={camera}
>
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
</T>
