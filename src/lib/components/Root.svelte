<script lang="ts">
  import Base from './Base.svelte'
  import type { EventHandlers, InheritableRootProperties } from '@pmndrs/uikit/internals'
  import { Root } from '@pmndrs/uikit'
  import { signal } from '@preact/signals-core'
  import { useThrelte, useTask } from '@threlte/core'
  import { useFontFamilies } from '../useFontFamilies'
  import { useDefaultProperties } from '../useDefaultProperties'

  type $$Props = {
    name?: string
    ref?: Root
  } & InheritableRootProperties &
    EventHandlers

  const { camera, renderer, shouldRender, scheduler, renderStage } = useThrelte()
  const defaultProperties = useDefaultProperties()
  const fontFamilies = useFontFamilies()
  const cameraSignal = signal(camera.current)
  export const ref = new Root(cameraSignal, renderer, $$restProps, defaultProperties, fontFamilies)

  $: cameraSignal.value = $camera

  useTask(
    (delta) => {
      if (shouldRender()) {
        ref.update(delta)
      }
    },
    {
      autoInvalidate: false,
      stage: scheduler.createStage(Symbol('uikit-stage'), { before: renderStage }),
    }
  )
</script>

<Base
  is={ref}
  {...$$restProps}
>
  <slot />
</Base>
