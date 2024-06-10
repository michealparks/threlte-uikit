<script lang="ts">
  import { useInteractivity } from '@threlte/extras'
  import { Container } from '@pmndrs/uikit'
  import Base from '../Shared/Base.svelte'
  import Root from '../Root.svelte'

  export let events = {}
  export let hover = false
  export let active = false

  export const interactivity = useInteractivity()
</script>

<Root>
  <Base
    is={new Container()}
    name="base"
    {events}
    {hover}
    {active}
  />
</Root>
