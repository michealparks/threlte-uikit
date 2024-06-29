import { SvelteComponent } from 'svelte'
import type { VideoProperties } from '@pmndrs/uikit/internals'
import type { EventHandlers } from '$lib/Events'
import type { ImageRef } from '$lib/useInternals'

export type Props = VideoProperties & {
  ref?: ImageRef
  src: string | HTMLVideoElement
  element?: HTMLVideoElement
} & EventHandlers

export default class Video extends SvelteComponent<Props> {}
