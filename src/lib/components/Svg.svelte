<script lang="ts">
  import { Svg } from '@pmndrs/uikit'
  import Base from './Base.svelte'
  import type { EventHandlers, InheritableContainerProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'

  type $$Props = {
    name?: string
    ref?: Svg
  } & InheritableContainerProperties &
    EventHandlers

  const defaultProperties = useDefaultProperties()
  export const ref = new Svg($$restProps, defaultProperties)
</script>

<Base
  is={ref}
  {...$$restProps}
>
  <slot />
</Base>
