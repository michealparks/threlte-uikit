<script lang="ts">
  import { Root, Container, Text, Image, Content, SVG, Video } from '$lib'
  import { T, useTask } from '@threlte/core'
  import { PerfMonitor, TransformControls } from '@threlte/extras'
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

  let clicked = false
</script>

<svelte:window
  on:click={() => (clicked = true)}
  <PerfMonitor
/>

<Fullscreen />

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 10]}
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
    backgroundColor="#fff"
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
      onclick={() => console.log('click container')}
    >
      <Text
        fontSize={40}
        text="hello uikit!"
        color="#fff"
        onclick={(event) => console.log('click text', event)}
        onpointerdown={(event) => console.log('pointerdown text', event)}
        onpointerup={(event) => console.log('pointerup text', event)}
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

{#if clicked}
  <TransformControls position.y={3}>
    <T.Group>
      <Root
        height={200}
        width={400}
      >
        <Video
          autoplay
          borderRadius={10}
          src="/BigBuckBunny_320x180.mp4"
        />
      </Root>
    </T.Group>
  </TransformControls>
{/if}

<T.DirectionalLight />
