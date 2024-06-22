<script lang="ts">
  import { Root, Container, Text, Image, Content, SVG } from '$lib'
  import { T, useTask } from '@threlte/core'
  import { PerfMonitor } from '@threlte/extras'
  import { OrbitControls, interactivity } from '@threlte/extras'
  import Fullscreen from './Fullscreen.svelte'
  // import { Inspector } from 'three-inspect'

  interactivity()

  let val = 0
  let elapsed = 0

  useTask((delta) => {
    elapsed += delta
    val = Math.sin(elapsed * 5) * 20
  })
</script>

<PerfMonitor />

<Fullscreen />

<T.PerspectiveCamera
  makeDefault
  position={[2, 2, 5]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>

<!-- <Inspector /> -->

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
  >
    <SVG
      src="./svelte.svg"
      width={30}
      padding={5}
    />
    <Container
      width="100%"
      padding={5}
      justifyContent="center"
      alignItems="center"
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
      <Content
        height={50}
        width={50}
        depthAlign="center"
        keepAspectRatio={false}
      >
        <T.Mesh name="thingy">
          <T.DodecahedronGeometry />
          <T.WireframeGeometry color="hotpink" />
        </T.Mesh>
      </Content>
    </Container>
    <Image
      width="100%"
      src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Lil-Bub-2013.jpg"
    />
  </Root>
</T.Group>

<T.DirectionalLight />
