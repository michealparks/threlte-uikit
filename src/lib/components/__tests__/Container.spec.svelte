<svelte:options accessors />

<script lang="ts">
  import Container from '../Container.svelte'
  import Root from '../Root.svelte'

  export let ref
</script>

<Root>
  <Container
    bind:ref
    name="container"
    {...$$restProps}
  />
</Root>
