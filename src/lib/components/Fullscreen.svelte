<script lang="ts">
  import { Group, type OrthographicCamera, type PerspectiveCamera } from 'three'
  import { useThrelte, T, watch } from '@threlte/core'
  import { batch, signal } from '@preact/signals-core'
  import { type FullscreenProperties, updateSizeFullscreen } from '@pmndrs/uikit/internals'
  import type { EventHandlers } from '$lib/Events'
  import type { RootRef } from '$lib/useInternals'
  import Root from './Root.svelte'
  import { writable } from 'svelte/store'

  type $$Props = FullscreenProperties & {
    ref?: RootRef
    name?: string
    distanceToCamera?: number
    pixelSize?: number
    camera?: PerspectiveCamera | OrthographicCamera
  } & EventHandlers

  export let pixelSize: $$Props['pixelSize'] = undefined
  export let distanceToCamera: $$Props['distanceToCamera'] = undefined
  export let ref: $$Props['ref'] = undefined

  let userCamera: $$Props['camera'] = undefined
  export { userCamera as camera }

  const { size, camera: defaultCamera } = useThrelte()

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
