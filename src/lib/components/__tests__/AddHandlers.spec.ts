import { render } from '@threlte/test'
import { describe, expect, it, vi } from 'vitest'

import Subject from './AddHandlers.spec.svelte'
import { readable } from 'svelte/store'

describe('AddHandlers', () => {
  it('fires events', async () => {
    const onClick = vi.fn()
    const onPointerEnter = vi.fn()
    const { scene, fireEvent } = render(Subject, {
      props: {
        userHandlers: { onClick, onPointerEnter },
        handlers: readable({}),
      },
    })

    await fireEvent(scene.getObjectByName('AddHandlers')!, 'click')
    expect(onClick).toHaveBeenCalledOnce()

    await fireEvent(scene.getObjectByName('AddHandlers')!, 'pointerenter')
    expect(onPointerEnter).toHaveBeenCalledOnce()
  })

  it('does not add non-interactive elements to the intersect objects', () => {
    const { component } = render(Subject, {
      props: {
        handlers: readable({}),
        userHandlers: {},
      },
    })

    expect(component.interactivity.interactiveObjects.length).toBe(0)
  })
})
