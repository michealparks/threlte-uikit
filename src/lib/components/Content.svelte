<script lang="ts">
  import { Content } from '@pmndrs/uikit'
  import Base from './Base.svelte'
  import type { EventHandlers, InheritableContentProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'

  type $$Props = {
    name?: string
    ref?: Content
  } & InheritableContentProperties &
    EventHandlers

  const defaultProperties = useDefaultProperties()
  export const ref = new Content($$restProps, defaultProperties)
</script>

<Base
  is={ref}
  {...$$restProps}
>
  <slot />
</Base>
