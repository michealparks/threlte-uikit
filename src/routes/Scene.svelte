<script lang="ts">
  import { Root, Container, Text, Image, reversePainterSortStable } from '$lib'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { OrbitControls, PerfMonitor, interactivity } from '@threlte/extras'

  const { renderer } = useThrelte()

  renderer.localClippingEnabled = true
  renderer.setTransparentSort(reversePainterSortStable)

  interactivity({
    // filter: (items) => {
    //   return items.slice(0, 1)
    // },
  })

  let val = 0
  let elapsed = 0

  useTask((delta) => {
    elapsed += delta
    val = Math.sin(elapsed * 5) * 20
  })
</script>

<PerfMonitor />

<T.PerspectiveCamera
  name="myCam"
  makeDefault
  position={[2, 2, 5]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.Group>
  <Root
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    borderColor="#555"
    borderWidth={2}
    padding={20}
    width={330 + val}
    height={300}
    hover={{
      backgroundColor: '#ccc',
    }}
    onClick={() => console.log('click root')}
  >
    <Container
      width="100%"
      padding={5}
      justifyContent="center"
      backgroundColor="red"
      hover={{
        backgroundColor: 'purple',
      }}
      active={{
        backgroundColor: 'black',
      }}
      onClick={() => console.log('click container')}
    >
      <Text
        fontSize={40}
        text="hello uikit!"
        color="#fff"
        onClick={(event) => console.log('click text', event)}
        onPointerDown={(event) => console.log('pointerdown text', event)}
        onPointerUp={(event) => console.log('pointerup text', event)}
      />
    </Container>
    <Image
      width="100%"
      src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Lil-Bub-2013.jpg"
    />
  </Root>
</T.Group>

<T.DirectionalLight />
