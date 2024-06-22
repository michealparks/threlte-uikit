import { signal } from '@preact/signals-core'
import { type AllOptionalProperties } from '@pmndrs/uikit/internals'
import { useDefaultProperties } from './useDefaultProperties'

export const usePropertySignals = <T>(properties: T) => {
  const propertySignals = {
    style: signal<T | undefined>(undefined),
    properties: signal<T | undefined>(undefined),
    default: signal<AllOptionalProperties | undefined>(undefined),
  }

  propertySignals.properties.value = properties
  propertySignals.default.value = useDefaultProperties()

  return propertySignals
}
