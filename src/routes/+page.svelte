<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div style="height: 100dvh">
  <Canvas renderMode="on-demand">
    <Scene />
  </Canvas>
</div>
