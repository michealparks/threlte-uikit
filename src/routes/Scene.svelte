<script lang="ts">
  import { Root, Container, Text, Image, Content, SVG, Video, type RootRef } from '$lib'
  import { T, useTask } from '@threlte/core'
  import { OrbitControls, interactivity } from '@threlte/extras'
  import Fullscreen from './Fullscreen.svelte'
  import { Inspector } from 'three-inspect'

  interactivity()

  let elapsed = 0

  let root: RootRef

  useTask((delta) => {
    elapsed += delta

    const d = Math.sin(elapsed * 5) * 20
    root.setStyle({ width: 330 + d })
  })

  let clicked = false
</script>

<Inspector />

<svelte:window on:click={() => (clicked = true)} />

<Fullscreen />

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 10]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.Group>
  <Root
    bind:ref={root}
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    borderColor="#555"
    borderWidth={2}
    padding={20}
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
    </Container>
    <Image
      width="100%"
      src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Lil-Bub-2013.jpg"
    />
  </Root>
</T.Group>

<T.Group position.x={4}>
  <Root>
    <Content
      width={100}
      backgroundColor="#eee"
      depthAlign="back"
    >
      <T.Mesh
        name="thingy"
        frustumCulled={false}
        visible
      >
        <T.DodecahedronGeometry />
        <T.MeshToonMaterial color="turquoise" />
      </T.Mesh>
    </Content>
  </Root>
</T.Group>

{#if clicked}
  <T.Group position.y={3}>
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
{/if}

<T.DirectionalLight />
<T.AmbientLight />
