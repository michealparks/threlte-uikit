<script lang="ts">
  import { Root, Container, Text } from '$lib'
</script>

<Root name="root">
  <Container name="container">
    <Text
      name="text"
      text="hello world"
      {...$$restProps}
    />
  </Container>
</Root>
