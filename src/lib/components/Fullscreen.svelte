<script lang="ts">
  import { useThrelte, T } from '@threlte/core'
  import {
    type FullscreenProperties,
    type EventHandlers,
    updateSizeFullscreen,
  } from '@pmndrs/uikit/internals'
  import { batch, signal } from '@preact/signals-core'
  import Root from './Root.svelte'
  import type { PerspectiveCamera } from 'three'
  import type { ComponentInternals } from '$lib/useInternals'

  type $$Props = FullscreenProperties & {
    ref?: ComponentInternals<FullscreenProperties>
    name?: string
    distanceToCamera?: number
    pixelSize?: number
  } & EventHandlers

  export let pixelSize: $$Props['pixelSize'] = undefined
  export let distanceToCamera: $$Props['distanceToCamera'] = undefined
  export let ref: $$Props['ref'] = undefined

  const { size, camera } = useThrelte()

  const xSizeSignal = signal(1)
  const ySizeSignal = signal(1)
  const pixelSizeSignal = signal(1)

  $: if (pixelSize !== undefined) pixelSizeSignal.value = pixelSize
  $: distance = distanceToCamera ? distanceToCamera : ($camera as PerspectiveCamera).near + 0.1

  $: {
    $camera, $size, distance
    batch(() =>
      updateSizeFullscreen(
        xSizeSignal,
        ySizeSignal,
        pixelSizeSignal,
        distance,
        $camera,
        $size.height
      )
    )
  }
</script>

<T.Group position.z={-distance}>
  <Root
    bind:ref
    {...$$restProps}
    sizeX={xSizeSignal}
    sizeY={ySizeSignal}
    pixelSize={pixelSizeSignal}
  >
    <slot />
  </Root>
</T.Group>
