import type { ParentContext } from '@pmndrs/uikit/internals'
import { getContext, setContext } from 'svelte'

const key = Symbol('uikit-parent-context')

export const createParent = (parent: ParentContext) => {
  setContext<ParentContext>(key, parent)
}

export const useParent = (): ParentContext => {
  return getContext<ParentContext>(key)
}
