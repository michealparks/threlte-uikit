<script lang="ts">
  import { CustomContainer } from '@pmndrs/uikit'
  import Base from './Shared/Base.svelte'
  import type { EventHandlers, InheritableCustomContainerProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'

  type $$Props = {
    name?: string
    ref?: CustomContainer
  } & InheritableCustomContainerProperties &
    EventHandlers

  const defaultProps = useDefaultProperties()
  export const ref = new CustomContainer($$restProps, defaultProps)
</script>

<Base
  is={ref}
  {...$$restProps}
>
  <slot />
</Base>
