import { SvelteComponent } from 'svelte'
import type { ImageProperties } from '@pmndrs/uikit/internals'
import type { EventHandlers } from '$lib/Events'
import type { Texture } from 'three'
import type { ImageRef } from '$lib/useInternals'

export type Props = ImageProperties & {
  ref?: ImageRef
  name?: string
  src?: string | Texture
} & EventHandlers

export default class Image extends SvelteComponent<Props> {}
