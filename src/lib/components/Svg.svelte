<script lang="ts">
  import { Svg } from '@pmndrs/uikit'
  import Base from './Base/Base.svelte'
  import type { EventHandlers, InheritableContainerProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'

  type $$Props = {
    name?: string
    ref?: Svg
  } & InheritableContainerProperties &
    EventHandlers

  const defaultProps = useDefaultProperties()
  export const ref = new Svg($$restProps, defaultProps)
</script>

<Base
  is={ref}
  {...$$restProps}
>
  <slot />
</Base>
