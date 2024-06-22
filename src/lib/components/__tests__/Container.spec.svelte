<svelte:options accessors />

<script lang="ts">
  import { type ContainerRef, Container, Root } from '$lib'

  export let ref: ContainerRef
</script>

<Root>
  <Container
    bind:ref
    name="container"
    {...$$restProps}
  />
</Root>
