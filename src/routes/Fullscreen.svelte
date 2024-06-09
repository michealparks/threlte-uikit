<script lang="ts">
  import { Fullscreen, Container, Text } from '$lib'

  let active = false
</script>

<Fullscreen>
  <Container alignItems="flex-end">
    <Container
      backgroundColor={active ? 'black' : '#eee'}
      padding={10}
      margin={10}
      onClick={() => {
        active = true
        navigator.clipboard.writeText('npm i threlte-uikit')
        setTimeout(() => (active = false), 1000)
      }}
    >
      <Text
        text={active ? 'copied!' : 'npm i threlte-uikit'}
        color={active ? 'white' : 'black'}
      />
    </Container>
  </Container>
</Fullscreen>
