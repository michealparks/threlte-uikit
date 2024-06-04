<script lang="ts">
  import { Container } from '@pmndrs/uikit'
  import Base from './Base.svelte'
  import type { EventHandlers, InheritableContainerProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'

  type $$Props = {
    name?: string
    ref?: Container
  } & InheritableContainerProperties &
    EventHandlers

  const defaultProperties = useDefaultProperties()
  export const ref = new Container($$restProps, defaultProperties)
</script>

<Base
  is={ref}
  {...$$restProps}
>
  <slot />
</Base>
