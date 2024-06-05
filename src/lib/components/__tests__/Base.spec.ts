import { act, render } from '@threlte/test'
import { describe, expect, it, vi } from 'vitest'
import { style, BaseFixture } from './fixtures'

describe('<Base>', () => {
  it('creates an object3D', () => {
    const { scene } = render(BaseFixture)
    expect(scene.getObjectByName('base')).toBeDefined()
  })

  it('sets properties', () => {
    const { scene } = render(BaseFixture, { ...style })
    expect(scene.getObjectByName('base')?.propertiesSignal.peek()).toStrictEqual(style)
  })

  it('resets properties', async () => {
    const { scene, rerender } = render(BaseFixture, { ...style })
    expect(scene.getObjectByName('base')?.propertiesSignal.peek()).toStrictEqual(style)

    await rerender({ marginTop: 5 })

    expect(scene.getObjectByName('base')?.propertiesSignal.peek().marginTop).toBe(5)
  })

  it('sets hover / active properties', async () => {
    const { scene } = render(BaseFixture, { hover: { ...style }, active: { ...style } })
    expect(scene.getObjectByName('base')?.propertiesSignal.peek()).toStrictEqual({
      hover: { ...style },
      active: { ...style },
    })
  })

  it('fires events', async () => {
    const onClick = vi.fn()
    const onPointerEnter = vi.fn()
    const { scene, fireEvent } = render(BaseFixture, { onClick, onPointerEnter })

    await fireEvent(scene.getObjectByName('base')!, 'click', {})
    expect(onClick).toHaveBeenCalledOnce()
    await act()
    expect(onClick).toHaveBeenCalledOnce()

    await fireEvent(scene.getObjectByName('base')!, 'pointerenter', {})
    expect(onPointerEnter).toHaveBeenCalledOnce()
    await act()
    expect(onPointerEnter).toHaveBeenCalledOnce()
  })
})
