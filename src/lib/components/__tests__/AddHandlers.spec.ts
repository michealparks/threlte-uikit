import { render } from '@threlte/test'
import { describe, expect, it, vi } from 'vitest'
import { getUiKitObject } from './util'

import Subject from './AddHandlers.spec.svelte'

describe('AddHandlers', () => {
  it('fires events', async () => {
    const onClick = vi.fn()
    const onPointerEnter = vi.fn()
    const { scene, fireEvent } = render(Subject, {
      props: {
        userHandlers: { onClick, onPointerEnter },
      },
    })

    await fireEvent(getUiKitObject(scene, 'AddHandlers'), 'click')
    expect(onClick).toHaveBeenCalledOnce()

    await fireEvent(getUiKitObject(scene, 'AddHandlers'), 'pointerenter')
    expect(onPointerEnter).toHaveBeenCalledOnce()
  })

  it('does not add non-interactive elements to the intersect objects', () => {
    const { component } = render(Subject)
    expect(component.interactivity.interactiveObjects.length).toBe(0)
  })

  it('adds events if hover properties are present', async () => {
    const { scene, fireEvent, component } = render(Subject, { hover: true })
    expect(component.interactivity.interactiveObjects.length).toBe(1)
    await fireEvent(getUiKitObject(scene, 'AddHandlers'), 'pointerenter')
    await fireEvent(getUiKitObject(scene, 'AddHandlers'), 'pointerleave')
  })

  it('adds events if active properties are present', async () => {
    const { scene, fireEvent, component } = render(Subject, { active: true })
    expect(component.interactivity.interactiveObjects.length).toBe(1)
    await fireEvent(getUiKitObject(scene, 'AddHandlers'), 'pointerenter')
    await fireEvent(getUiKitObject(scene, 'AddHandlers'), 'pointerleave')
  })
})
