<script lang="ts">
  import { CustomContainer } from '@pmndrs/uikit'
  import Base from './Base.svelte'
  import type { EventHandlers, InheritableCustomContainerProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'

  type $$Props = {
    name?: string
    ref?: CustomContainer
  } & InheritableCustomContainerProperties &
    EventHandlers

  const defaultProperties = useDefaultProperties()
  export const ref = new CustomContainer($$restProps, defaultProperties)
</script>

<Base
  is={ref}
  {...$$restProps}
>
  <slot />
</Base>
