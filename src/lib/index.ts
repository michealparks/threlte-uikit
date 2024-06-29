// Contexts
export { provideDefaultProperties } from './useDefaultProperties'
export { provideFontFamilies } from './useFontFamilies'

export {
  basedOnPreferredColorScheme,
  setPreferredColorScheme,
  getPreferredColorScheme,
  isDarkMode,
  canvasInputProps,
  type PreferredColorScheme,
  type MaterialClass,
  type ScrollListeners,
  type LayoutListeners,
  type ViewportListeners,
  type Listeners,
  type AllOptionalProperties,
  type ColorRepresentation,
} from '@pmndrs/uikit'

export type {
  ContainerProperties,
  ContentProperties,
  FullscreenProperties,
  ImageProperties,
  RootProperties,
  SvgProperties,
  TextProperties,
  VideoProperties,
} from '@pmndrs/uikit/internals'

export { type FontFamilies } from '@pmndrs/uikit/internals'

// Components
export { default as Container } from './components/Container/Container.svelte'
export { default as Content } from './components/Content/Content.svelte'
export { default as Fullscreen } from './components/Fullscreen/Fullscreen.svelte'
export { default as Image } from './components/Image/Image.svelte'
export { default as Root } from './components/Root/Root.svelte'
export { default as SVG } from './components/Svg/Svg.svelte'
export { default as Text } from './components/Text/Text.svelte'
export { default as Video } from './components/Video/Video.svelte'

// Refs
export type { ContainerRef, ContentRef, ImageRef, RootRef, SvgRef, TextRef } from './useInternals'
