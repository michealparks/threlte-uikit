<script lang="ts">
  import { useInteractivity } from '@threlte/extras'
  import AddHandlers from '../AddHandlers.svelte'
  import { Object3D } from 'three'
  import type { EventHandlers } from '@pmndrs/uikit'
  import type { Signal } from '@preact/signals-core'

  export let userHandlers: EventHandlers
  export let handlers: Signal<EventHandlers>

  export const interactivity = useInteractivity()

  const ref = new Object3D()
  ref.name = 'AddHandlers'
</script>

<AddHandlers
  {ref}
  {userHandlers}
  {handlers}
/>
