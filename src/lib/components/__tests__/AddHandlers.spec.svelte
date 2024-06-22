<script lang="ts">
  import { Object3D } from 'three'
  import { useInteractivity } from '@threlte/extras'
  import { signal, type Signal } from '@preact/signals-core'
  import AddHandlers from '../AddHandlers.svelte'

  import type { EventHandlers } from '@pmndrs/uikit'

  export let userHandlers: EventHandlers = {}
  export let handlers: Signal<EventHandlers> = signal({})

  export const interactivity = useInteractivity()

  const ref = new Object3D()
  ref.name = 'AddHandlers'
</script>

<AddHandlers
  {ref}
  {userHandlers}
  {handlers}
/>
