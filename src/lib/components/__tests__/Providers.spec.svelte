<svelte:options accessors />

<script lang="ts">
  import {
    Root,
    Container,
    Text,
    provideDefaultProperties,
    provideFontFamilies,
    type AllOptionalProperties,
    type FontFamilies,
    type RootRef,
    type ContainerRef,
    type TextRef,
  } from '$lib'

  export let style: AllOptionalProperties | undefined = undefined
  export let fontFamilies: FontFamilies | undefined = undefined

  export let root: RootRef
  export let container: ContainerRef
  export let text: TextRef

  if (style) {
    provideDefaultProperties(style)
  }

  if (fontFamilies) {
    provideFontFamilies(fontFamilies)
  }
</script>

<Root
  bind:ref={root}
  name="root"
>
  <Container
    bind:ref={container}
    name="box"
  >
    <Text
      bind:ref={text}
      name="text"
      text="hello uikit"
    />
  </Container>
</Root>
