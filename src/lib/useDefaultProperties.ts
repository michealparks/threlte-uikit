import { getContext, setContext } from 'svelte'
import type { AllOptionalProperties } from '@pmndrs/uikit/internals'

const contextKey = Symbol('default-props-context')

export const createDefaultProperties = (defaults: AllOptionalProperties) => {
  setContext(contextKey, defaults)
}

export const useDefaultProperties = () => {
  return getContext<AllOptionalProperties>(contextKey) ?? {}
}
