<script lang="ts">
  import { Svg } from '@pmndrs/uikit'
  import Base from './Shared/Base.svelte'
  import type {
    EventHandlers,
    InheritableSvgProperties,
    SvgProperties,
  } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'
  import { eventPropNames } from './Shared/events'
  import type { Writable } from 'type-fest'

  type $$Props = {
    name?: string
    ref?: Svg
  } & InheritableSvgProperties &
    EventHandlers

  export let name: string | undefined = undefined
  export let active: InheritableSvgProperties['active'] = undefined
  export let hover: InheritableSvgProperties['hover'] = undefined

  const defaultProps = useDefaultProperties()
  const events: EventHandlers = {}

  let props: Writable<SvgProperties> = {}

  $: {
    props = {}
    for (const key of Object.keys($$restProps)) {
      if (eventPropNames.includes(key as keyof EventHandlers)) {
        events[key as keyof EventHandlers] = $$restProps[key]
      } else {
        props[key as keyof SvgProperties] = $$restProps[key]
      }
    }
    if (active) props.active = active
    if (hover) props.hover = hover
  }

  export const ref = new Svg(undefined, defaultProps)
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
