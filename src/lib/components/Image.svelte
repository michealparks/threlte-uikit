<script lang="ts">
  import type { Texture } from 'three'
  import { Image } from '@pmndrs/uikit'
  import Base from './Base.svelte'
  import type { EventHandlers, InheritableImageProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'

  type $$Props = {
    src?: string | Texture
    name?: string
    ref?: Image
  } & InheritableImageProperties &
    EventHandlers

  const defaultProperties = useDefaultProperties()
  export const ref = new Image($$restProps, defaultProperties)
</script>

<Base
  is={ref}
  {...$$restProps}
>
  <slot />
</Base>
