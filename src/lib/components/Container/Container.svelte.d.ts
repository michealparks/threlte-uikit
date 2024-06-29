import { SvelteComponent } from 'svelte'
import type { ContainerProperties } from '@pmndrs/uikit/internals'
import type { ContainerRef } from '$lib/useInternals'
import { type EventHandlers } from '$lib/Events'

export type Props = ContainerProperties & {
  ref?: ContainerRef
  name?: string
} & EventHandlers

export default class Container extends SvelteComponent<Props> {}
