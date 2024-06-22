<script>
  import { Object3D } from 'three'
  import { useInteractivity } from '@threlte/extras'
  import AddHandlers from '../AddHandlers.svelte'

  export const interactivity = useInteractivity()

  const ref = new Object3D()
  ref.name = 'AddHandlers'
</script>

<AddHandlers
  {ref}
  {...$$restProps}
/>
