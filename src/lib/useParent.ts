import type { ParentContext } from '@pmndrs/uikit/internals'
import { currentWritable, type CurrentWritable } from '@threlte/core'
import { getContext, setContext } from 'svelte'

const key = Symbol('uikit-parent-context')

export const createParent = (parent: ParentContext) => {
  const context = currentWritable(parent)
  setContext<CurrentWritable<ParentContext>>(key, context)
  return context
}

export const useParent = (): CurrentWritable<ParentContext> => {
  return getContext<CurrentWritable<ParentContext>>(key)
}
