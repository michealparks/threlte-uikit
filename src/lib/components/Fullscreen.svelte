<script lang="ts">
  import Base from './Base.svelte'
  import type { EventHandlers, InheritableRootProperties } from '@pmndrs/uikit/internals'
  import { Fullscreen } from '@pmndrs/uikit'
  import { useThrelte, useTask } from '@threlte/core'
  import { useFontFamilies } from '../useFontFamilies'
  import { useDefaultProperties } from '../useDefaultProperties'

  type $$Props = {
    name?: string
    distanceToCamera?: number
    ref?: Fullscreen
  } & InheritableRootProperties &
    EventHandlers

  export let distanceToCamera: $$Props['distanceToCamera'] = undefined

  const { renderer, scheduler, renderStage, shouldRender } = useThrelte()
  const defaultProperties = useDefaultProperties()
  const fontFamilies = useFontFamilies()
  export const ref = new Fullscreen(
    renderer,
    distanceToCamera,
    $$restProps,
    defaultProperties,
    fontFamilies
  )

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
