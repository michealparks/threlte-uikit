<script lang="ts">
  import { Text } from '@pmndrs/uikit'
  import Base from './Shared/Base.svelte'
  import { signal } from '@preact/signals-core'
  import type {
    EventHandlers,
    InheritableTextProperties,
    TextProperties,
  } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'
  import { eventPropNames } from './Shared/events'
  import type { Writable } from 'type-fest'

  type $$Props = {
    text: string
    name?: string
    ref?: Text
  } & InheritableTextProperties &
    EventHandlers

  export let name: string | undefined = undefined
  export let active: InheritableTextProperties['active'] = undefined
  export let hover: InheritableTextProperties['hover'] = undefined
  export let text: $$Props['text']

  const defaultProps = useDefaultProperties()
  const events: EventHandlers = {}

  const textSignal = signal(text)
  $: textSignal.value = text

  let props: Writable<TextProperties> = {}

  $: {
    props = {}
    for (const key of Object.keys($$restProps)) {
      if (eventPropNames.includes(key as keyof EventHandlers)) {
        events[key as keyof EventHandlers] = $$restProps[key]
        continue
      } else {
        props[key] = $$restProps[key]
      }
    }
    if (active) props.active = active
    if (hover) props.hover = hover
  }

  export const ref = new Text(textSignal, undefined, defaultProps)
  $: ref.setProperties(props)
  $: if (name) ref.name = name
</script>

<Base
  is={ref}
  {events}
  active={active !== undefined}
  hover={hover !== undefined}
/>
