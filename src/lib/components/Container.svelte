<script lang="ts">
  import { Container } from '@pmndrs/uikit'
  import Base from './Base/Base.svelte'
  import type { EventHandlers, InheritableContainerProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'

  type $$Props = {
    name?: string
    ref?: Container
  } & InheritableContainerProperties &
    EventHandlers

  const defaultProps = useDefaultProperties()
  export const ref = new Container($$restProps, defaultProps)
</script>

<Base
  is={ref}
  {...$$restProps}
>
  <slot />
</Base>
