import { SvelteComponent } from 'svelte'
import type { RootProperties } from '@pmndrs/uikit/internals'
import type { EventHandlers } from '$lib/Events'
import type { WithReactive } from '@pmndrs/uikit/internals'
import type { RootRef } from '$lib/useInternals'

export type Props = RootProperties &
  WithReactive<{ pixelSize?: number }> & {
    ref?: RootRef
    name?: string
  } & EventHandlers

export default class Root extends SvelteComponent<Props> {}
