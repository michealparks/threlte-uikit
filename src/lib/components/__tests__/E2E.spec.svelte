<script lang="ts">
  import { Root, Container, Text } from '../..'
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
