<svelte:options accessors />

<script>
  import { Container, Root } from '$lib'

  export let ref
</script>

<Root>
  <Container
    bind:ref
    name="container"
    {...$$restProps}
  />
</Root>
