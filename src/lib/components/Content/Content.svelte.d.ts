import { SvelteComponent } from 'svelte'
import type { ContentProperties } from '@pmndrs/uikit/internals'
import type { ContentRef } from '$lib/useInternals'
import type { EventHandlers } from '$lib/Events'

export type Props = ContentProperties & {
  ref?: ContentRef
  name?: string
} & EventHandlers

export default class Content extends SvelteComponent<Props> {}
