<script>
  import { Root, Container, Text } from '$lib'
  import { useInteractivity } from '@threlte/extras'

  export const interactivity = useInteractivity()
</script>

<Root>
  <Container>
    <Text text="interactivity test" />
  </Container>
</Root>
