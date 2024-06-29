import { SvelteComponent } from 'svelte'
import type { FullscreenProperties } from '@pmndrs/uikit/internals'
import type { RootRef } from '$lib/useInternals'
import type { PerspectiveCamera, OrthographicCamera } from 'three'
import type { EventHandlers } from '$lib/Events'

export type Props = FullscreenProperties & {
  ref?: RootRef
  name?: string
  distanceToCamera?: number
  pixelSize?: number
  camera?: PerspectiveCamera | OrthographicCamera
} & EventHandlers

export default class Fullscreen extends SvelteComponent<Props> {}
