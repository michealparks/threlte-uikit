import { act, render } from '@threlte/test'
import { describe, expect, it, vi } from 'vitest'
import { style, getUiKitObject } from './util'

import Subject from './Base.spec.svelte'

describe('Base', () => {
  it('creates an object3D', () => {
    const { scene } = render(Subject)
    expect(getUiKitObject(scene, 'base')).toBeDefined()
  })

  it('sets properties', () => {
    const { scene } = render(Subject, { ...style })
    expect(getUiKitObject(scene, 'base').propertiesSignal.peek()).toEqual(style)
  })

  it('resets properties', async () => {
    const { scene, rerender } = render(Subject, { ...style })
    expect(getUiKitObject(scene, 'base').propertiesSignal.peek()).toEqual(style)

    await rerender({ marginTop: 5 })

    expect(getUiKitObject(scene, 'base').propertiesSignal.peek()).toEqual({
      ...style,
      marginTop: 5,
    })
  })

  it('adds props', async () => {
    const { scene, rerender } = render(Subject, { ...style })
    expect(getUiKitObject(scene, 'base').propertiesSignal.peek()).toEqual(style)

    await rerender({ marginBottom: 5 })

    expect(getUiKitObject(scene, 'base').propertiesSignal.peek()).toEqual({
      ...style,
      marginBottom: 5,
    })
  })

  it('sets hover / active properties', async () => {
    const props = { hover: { ...style }, active: { ...style } }
    const { scene } = render(Subject, props)
    expect(getUiKitObject(scene, 'base').propertiesSignal.peek()).toEqual(props)
  })

  it('fires events', async () => {
    const onClick = vi.fn()
    const onPointerEnter = vi.fn()
    const { scene, fireEvent } = render(Subject, { onClick, onPointerEnter })

    await fireEvent(getUiKitObject(scene, 'base'), 'click', {} as any)
    expect(onClick).toHaveBeenCalledOnce()
    await act()
    expect(onClick).toHaveBeenCalledOnce()

    await fireEvent(getUiKitObject(scene, 'base'), 'pointerenter', {} as any)
    expect(onPointerEnter).toHaveBeenCalledOnce()
    await act()
    expect(onPointerEnter).toHaveBeenCalledOnce()
  })
})
