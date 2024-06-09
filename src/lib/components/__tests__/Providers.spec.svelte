<script>
  import { Root, Container, Text, createDefaultProperties, createFontFamilies } from '$lib'
  import { fontFamilies, style } from './util'

  createDefaultProperties(style)

  createFontFamilies(fontFamilies)
</script>

<Root name="root">
  <Container name="box">
    <Text
      name="text"
      text="hello uikit"
    />
  </Container>
</Root>
