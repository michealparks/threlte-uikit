import { SvelteComponent } from 'svelte'
import type { SvgProperties } from '@pmndrs/uikit/internals'
import type { EventHandlers } from '$lib/Events'
import type { SvgRef } from '$lib/useInternals'

export type Props = SvgProperties & {
  ref?: SvgRef
  name?: string
  src: string
} & EventHandlers

export default class SVG extends SvelteComponent<Props> {}
