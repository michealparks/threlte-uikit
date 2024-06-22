import { signal } from '@preact/signals-core'
import { type AllOptionalProperties } from '@pmndrs/uikit/internals'
import { useDefaultProperties } from './useDefaultProperties'

export const usePropertySignals = <T>(properties: T) => {
  return {
    style: signal<T | undefined>(undefined),
    properties: signal<T | undefined>(properties),
    default: signal<AllOptionalProperties | undefined>(useDefaultProperties()),
  }
}
