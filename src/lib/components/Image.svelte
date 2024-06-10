<script lang="ts">
  import type { Texture } from 'three'
  import { Image } from '@pmndrs/uikit'
  import Base from './Shared/Base.svelte'
  import type { EventHandlers, InheritableImageProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'
  import { eventPropNames } from './Shared/events'
  import type { Writable } from 'type-fest'

  type Properties = Writable<InheritableImageProperties>
  type $$Props = {
    src?: string | Texture
    name?: string
    ref?: Image
  } & Properties &
    EventHandlers

  export let name: string | undefined = undefined
  export let active: Properties['active'] = undefined
  export let hover: Properties['hover'] = undefined

  const defaultProps = useDefaultProperties()
  const events: EventHandlers = {}

  let props: Properties = {}

  $: {
    props = {}
    for (const key of Object.keys($$restProps)) {
      if (eventPropNames.includes(key as keyof EventHandlers)) {
        events[key as keyof EventHandlers] = $$restProps[key]
      } else {
        props[key as keyof Properties] = $$restProps[key]
      }
    }
    if (active) props.active = active
    if (hover) props.hover = hover
  }

  export const ref = new Image(undefined, defaultProps)
  $: ref.setProperties(props)
  $: if (name) ref.name = name
</script>

<Base
  is={ref}
  {events}
  active={active !== undefined}
  hover={hover !== undefined}
>
  <slot />
</Base>
