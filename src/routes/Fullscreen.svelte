<script lang="ts">
  import { Fullscreen, Container, Text } from '$lib'
  import { Portal, PortalTarget } from './Portal'

  let active = false
</script>

<Portal id="bob">
  <Container alignItems="flex-end">
    <Container
      backgroundColor={active ? 'black' : '#eee'}
      hover={{ backgroundColor: active ? 'black' : '#ddd' }}
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
</Portal>

<Fullscreen>
  <PortalTarget id="bob" />
</Fullscreen>
