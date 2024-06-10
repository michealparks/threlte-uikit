<script lang="ts">
  import Container from '../Container.svelte'
  import Root from '../Root.svelte'
</script>

<Root>
  <Container
    name="container"
    {...$$restProps}
  />
</Root>
