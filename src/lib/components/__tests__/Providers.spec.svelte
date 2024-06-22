<svelte:options accessors />

<script>
  import { Root, Container, Text, provideDefaultProperties, provideFontFamilies } from '$lib'

  export let root
  export let container
  export let text

  if ($$props.style) {
    provideDefaultProperties($$props.style)
  }

  if ($$props.fontFamilies) {
    provideFontFamilies($$props.fontFamilies)
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
