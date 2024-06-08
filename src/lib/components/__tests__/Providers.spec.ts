import { render } from '@threlte/test'
import { describe, expect, it } from 'vitest'
import Subject from './Providers.spec.svelte'
import { fontFamilies, getUiKitObject, style } from './util'

describe('Providers', () => {
  it('provides a default properties context', () => {
    const { scene } = render(Subject)

    expect(getUiKitObject(scene, 'root').defaultPropertiesSignal.peek()).toEqual(style)
    expect(getUiKitObject(scene, 'box').defaultPropertiesSignal.peek()).toEqual(style)
    expect(getUiKitObject(scene, 'text').defaultPropertiesSignal.peek()).toEqual(style)
  })

  it('provides a font family context', () => {
    const { scene } = render(Subject)

    expect(getUiKitObject(scene, 'root').fontFamiliesSignal.peek()).toEqual(fontFamilies)
  })
})
