import { render } from '@threlte/test'
import { describe, expect, it } from 'vitest'
import Subject from './Providers.spec.svelte'

describe('Providers', () => {
  it('provides a default properties context', () => {
    const { component } = render(Subject, { style: { backgroundColor: '#fff' } })

    expect(component.root.getComputedProperty('backgroundColor')).toEqual('#fff')
    expect(component.container.getComputedProperty('backgroundColor')).toEqual('#fff')
    expect(component.text.getComputedProperty('backgroundColor')).toEqual('#fff')
  })

  it.skip('provides a font family context', () => {})
})
