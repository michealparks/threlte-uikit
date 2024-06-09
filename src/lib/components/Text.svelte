<script lang="ts">
  import { Text } from '@pmndrs/uikit'
  import Base from './Shared/Base.svelte'
  import { signal } from '@preact/signals-core'
  import type { EventHandlers, InheritableTextProperties } from '@pmndrs/uikit/internals'
  import { useDefaultProperties } from '$lib/useDefaultProperties'

  type $$Props = {
    text: string
    name?: string
    ref?: Text
  } & InheritableTextProperties &
    EventHandlers

  export let text: $$Props['text']

  const defaultProps = useDefaultProperties()
  const textSignal = signal(text)
  export const ref = new Text(textSignal, $$restProps, defaultProps)

  $: textSignal.value = text
</script>

<Base
  is={ref}
  {...$$restProps}
/>
