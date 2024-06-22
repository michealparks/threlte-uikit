import type { ParentContext } from '@pmndrs/uikit/internals'
import { getContext, setContext } from 'svelte'

const key = Symbol('uikit-parent-context')

export const createParent = (context: ParentContext) => {
  setContext<ParentContext>(key, context)
}

export const useParent = (): ParentContext => {
  return getContext<ParentContext>(key)
}
