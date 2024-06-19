<script lang="ts">
  import { useThrelte, watch, T } from '@threlte/core'
  import {
    type FullscreenProperties,
    type EventHandlers,
    updateSizeFullscreen,
    createRoot,
  } from '@pmndrs/uikit/internals'
  import { batch, signal } from '@preact/signals-core'
  import Root from './Root.svelte'
  import type { PerspectiveCamera } from 'three'

  type $$Props = FullscreenProperties & {
    ref?: ReturnType<typeof createRoot>
    name?: string
    distanceToCamera?: number
    pixelSize?: number
  } & EventHandlers

  export let pixelSize: $$Props['pixelSize'] = undefined
  export let distanceToCamera: $$Props['distanceToCamera'] = undefined
  export let ref: $$Props['ref'] = undefined

  const { size, camera } = useThrelte()

  const sizeX = signal(1)
  const sizeY = signal(1)
  const pixSize = signal(1)

  $: if (pixelSize !== undefined) pixSize.value = pixelSize
  $: distance = distanceToCamera ? -distanceToCamera : ($camera as PerspectiveCamera).near + 0.1
  $: {
    batch(() => updateSizeFullscreen(sizeX, sizeY, pixSize, distance, $camera, $size.height))
  }

  watch(size, ($size) => {
    // @TODO why on the next frame?
    // requestAnimationFrame(() => ref.updateSize())
  })
</script>

<T.Group position.z={distance}>
  <Root
    bind:ref
    {...$$restProps}
    {sizeX}
    {sizeY}
    {pixelSize}
  >
    <slot />
  </Root>
</T.Group>
