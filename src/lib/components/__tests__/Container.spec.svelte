<svelte:options accessors />

<script>
  import Container from '../Container/Container.svelte'
  import Root from '../Root/Root.svelte'

  export let ref
</script>

<Root>
  <Container
    bind:ref
    name="container"
    {...$$restProps}
  />
</Root>
