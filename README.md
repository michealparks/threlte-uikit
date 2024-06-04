# threlte-uikit

```
npm i threlte-uikit
```

```svelte
<script>
  import { T } from '@threlte/core'
  import { Root, Container, Text } from 'threlte-uikit'
</script>

<T.Group>
  <Root
    padding={10}
    backgroundColor="#ccc"
  >
    <Container>
      <Text text="hello uikit!" />
    </Container>
  </Root>
</T.Group>
```

## Components

- [Container](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#container)
- [Root](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#root)
- [Fullscreen](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#fullscreen)
- [Image](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#image)
- [Text](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#text)
- [SVG](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#svg)
- [Content](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#content)
- [CustomContainer](https://docs.pmnd.rs/uikit/getting-started/components-and-properties#customcontainer)

## Context providers

- `createDefaultProperties()`

Allows overriding the default properties for all UIKit components and children components of the component in which it is called.

```ts
createDefaultProperties({
  margin: 10,
})
```

- `createFontFamilies()`

Provides new font families to all children. Instructions for creating fonts that can be consumed by UIKit can be found [here](https://docs.pmnd.rs/uikit/tutorials/custom-fonts).

```ts
createFontFamilies({
  roboto: {
    light: 'url-to-json',
    medium: 'url-to-json',
    bold: 'url-to-json',
  },
})
```

## Events

Call the Threlte [`interactivity`](https://threlte.xyz/docs/reference/extras/interactivity) plugin in the same component or higher than your `<Root>` to enable events. All events supported by `interactivity` are supported. Callback props are used instead of event dispatching to allow Svelte 4 and 5 compatibility.

```svelte
<Container
  onClick={() => console.log('click')}
  onPointerEnter={() => console.log('pointer entered')}
  onPointerLeave={() => console.log('pointer left')}
>
  <Text text="I am a button" />
</Container>
```

Calling interactivity is necessary for any `hover` or `active` conditional properties to work.

UIKit will set multiple geometries on the same plane. This will result in duplicate events firing for a single click, hover, etc. unless you filter only the first hit.

```ts
interactivity({
  filter: (hits) => hits.slice(0, 1),
})
```
