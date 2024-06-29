import { SvelteComponent } from 'svelte'
import type { TextProperties } from '@pmndrs/uikit/internals'
import type { EventHandlers } from '$lib/Events'
import type { TextRef } from '$lib/useInternals'

export type Props = TextProperties & {
  ref?: TextRef
  name?: string
  text: string
} & EventHandlers

export default class Text extends SvelteComponent<Props> {}
