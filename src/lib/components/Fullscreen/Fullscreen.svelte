<script lang="ts">
  import { Group, type PerspectiveCamera } from 'three'
  import { useThrelte, T, watch } from '@threlte/core'
  import { batch, signal } from '@preact/signals-core'
  import { updateSizeFullscreen } from '@pmndrs/uikit/internals'
  import Root from '../Root/Root.svelte'
  import { writable } from 'svelte/store'
  import type { Props } from './Fullscreen.svelte'

  type $$Props = Props

  export let pixelSize: Props['pixelSize'] = undefined
  export let distanceToCamera: Props['distanceToCamera'] = undefined
  export let ref: Props['ref'] = undefined

  let userCamera: Props['camera'] = undefined
  export { userCamera as camera }

  const { scene, size, camera: defaultCamera } = useThrelte()

  const xSizeSignal = signal(1)
  const ySizeSignal = signal(1)
  const pixelSizeSignal = signal(1)

  $: if (pixelSize !== undefined) {
    pixelSizeSignal.value = pixelSize
  }

  const camera = writable(userCamera ?? $defaultCamera)
  $: camera.set(userCamera ?? $defaultCamera)

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

  const group = new Group()

  watch(camera, ($camera) => {
    $camera.add(group)
    return () => {
      $camera.remove(group)
    }
  })
</script>

<T
  is={group}
  position.z={-distance}
  attach={({ ref }) => {
    scene.add(group)
    return () => scene.remove(group)
  }}
>
  <Root
    bind:ref
    {...$$restProps}
    sizeX={xSizeSignal}
    sizeY={ySizeSignal}
    pixelSize={pixelSizeSignal}
  >
    <slot />
  </Root>
</T>
