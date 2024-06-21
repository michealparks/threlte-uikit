import { render } from '@threlte/test'
import { describe, expect, it, vi } from 'vitest'
import { style, getUiKitObject } from './util'

import Subject from './Container.spec.svelte'

describe('Container', () => {
  it('creates an object3D', () => {
    const { scene } = render(Subject)
    expect(getUiKitObject(scene, 'container')).toBeDefined()
  })

  it('sets properties', async () => {
    const { component } = render(Subject, { fontSize: 12, width: 'auto' })

    expect(component.ref.getComputedProperty('fontSize')).toEqual(12)
    expect(component.ref.getComputedProperty('width')).toEqual('auto')
  })

  it('resets properties', async () => {
    const { component, rerender } = render(Subject, { marginTop: 2 })

    await rerender({ marginTop: 5 })

    expect(component.ref.getComputedProperty('marginTop')).toEqual(5)
  })

  it('adds props', async () => {
    const { component, rerender } = render(Subject)

    await rerender({ marginBottom: 2 })

    expect(component.ref.getComputedProperty('marginBottom')).toEqual(2)
  })

  it('sets hover / active properties', async () => {
    const props = { hover: { fontSize: 12 }, active: { width: 'auto' } }
    const { component } = render(Subject, props)

    expect(component.ref.getComputedProperty('hover')).toEqual({ fontSize: 12 })
    expect(component.ref.getComputedProperty('active')).toEqual({ width: 'auto' })
  })

  it('fires events', async () => {
    const onClick = vi.fn()
    const onPointerEnter = vi.fn()
    const { scene, fireEvent } = render(Subject, { onClick, onPointerEnter })

    const container = scene.getObjectByName('container')!

    await fireEvent(container, 'click')
    expect(onClick).toHaveBeenCalledOnce()

    await fireEvent(container, 'pointerenter')
    expect(onPointerEnter).toHaveBeenCalledOnce()
  })
})
