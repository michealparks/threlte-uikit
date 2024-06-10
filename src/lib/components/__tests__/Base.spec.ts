import { act, render } from '@threlte/test'
import { describe, expect, it, vi } from 'vitest'
import { getUiKitObject } from './util'

import Subject from './Base.spec.svelte'

describe('Base', () => {
  it('fires events', async () => {
    const onClick = vi.fn()
    const onPointerEnter = vi.fn()
    const { scene, fireEvent } = render(Subject, {
      props: {
        events: { onClick, onPointerEnter },
      },
    })

    await fireEvent(getUiKitObject(scene, 'base'), 'click', {} as any)
    expect(onClick).toHaveBeenCalledOnce()

    await fireEvent(getUiKitObject(scene, 'base'), 'pointerenter', {} as any)
    expect(onPointerEnter).toHaveBeenCalledOnce()
  })

  it('does not add non-interactive elements to the intersect objects', () => {
    const { component } = render(Subject)
    expect(component.interactivity.interactiveObjects.length).toBe(0)
  })

  // @TODO only add pointerenter leave
  it('adds events if hover properties are present', async () => {
    const { scene, fireEvent, component } = render(Subject, { hover: true })
    expect(component.interactivity.interactiveObjects.length).toBe(1)
    await fireEvent(getUiKitObject(scene, 'base'), 'pointerenter', {} as any)
    await fireEvent(getUiKitObject(scene, 'base'), 'pointerleave', {} as any)
  })

  // @TODO only add pointerup down
  it('adds events if active properties are present', async () => {
    const { scene, fireEvent, component } = render(Subject, { active: true })
    expect(component.interactivity.interactiveObjects.length).toBe(1)
    await fireEvent(getUiKitObject(scene, 'base'), 'pointerenter', {} as any)
    await fireEvent(getUiKitObject(scene, 'base'), 'pointerleave', {} as any)
  })
})
