<script lang="ts">
  import Image from '../Image/Image.svelte'
  import { SRGBColorSpace, VideoTexture } from 'three'
  import { useThrelte } from '@threlte/core'
  import { setupVideoElementInvalidation, updateVideoElement } from '@pmndrs/uikit/internals'
  import { onDestroy } from 'svelte'
  import type { Props } from './Video.svelte'

  type $$Props = Props

  export let src: Props['src']
  export let ref: Props['ref'] = undefined
  export let autoplay: Props['autoplay'] = undefined
  export let loop: Props['loop'] = undefined
  export let muted: Props['muted'] = undefined
  export let playbackRate: Props['playbackRate'] = undefined
  export let preservesPitch: Props['preservesPitch'] = undefined
  export let volume: Props['volume'] = undefined

  const { invalidate } = useThrelte()

  let aspectRatio = 1

  $: providedHtmlElement = src instanceof HTMLVideoElement ? src : undefined

  export let element: HTMLVideoElement | undefined = undefined
  $: element = providedHtmlElement ?? document.createElement('video')
  $: setupVideoElementInvalidation(element, invalidate)
  $: updateVideoElement(element, {
    src,
    autoplay,
    loop,
    muted,
    playbackRate,
    preservesPitch,
    volume,
  })

  const updateAspectRatio = () => {
    aspectRatio = element.videoWidth / element.videoHeight
  }

  $: {
    element
    updateAspectRatio()
  }

  $: {
    element.removeEventListener('resize', updateAspectRatio)
    element.addEventListener('resize', updateAspectRatio)
  }

  onDestroy(() => element.removeEventListener('resize', updateAspectRatio))

  let texture: VideoTexture | undefined

  $: {
    if (texture) texture.dispose()
    texture = new VideoTexture(element)
    texture.colorSpace = SRGBColorSpace
  }
</script>

{#if texture}
  <Image
    bind:ref
    {aspectRatio}
    {...$$restProps}
    src={texture}
  >
    <slot />
  </Image>
{/if}
