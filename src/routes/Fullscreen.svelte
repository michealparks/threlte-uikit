<script lang="ts">
  import { Fullscreen, Container, Text } from '$lib'

  let active = false
</script>

<Fullscreen>
  <Container alignItems="flex-end">
    <Container
      backgroundColor={active ? 'black' : '#eee'}
      hover={{ backgroundColor: active ? 'black' : '#ddd' }}
      padding={10}
      margin={10}
      onclick={() => {
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
