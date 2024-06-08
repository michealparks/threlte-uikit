import type { AllOptionalProperties } from '@pmndrs/uikit'
import type { Object3D, Scene } from 'three'
import type { Signal } from '@preact/signals-core'
import type { FontFamilies } from '@pmndrs/uikit/internals'

export const style: AllOptionalProperties = {
  marginTop: 10,
  paddingLeft: 5,
  fontSize: 12,
  width: 'auto',
  alignItems: 'flex-start',
  backgroundColor: '#fff',
}

export const fontFamilies: FontFamilies = {
  monospace: {
    light: '/path/to/light',
    medium: '/path/to/medium',
  },
}

export const getUiKitObject = <T extends Object3D>(scene: Scene, name: string) => {
  return scene.getObjectByName(name) as T & {
    propertiesSignal: Signal
    defaultPropertiesSignal: Signal
    fontFamiliesSignal: Signal
  }
}
