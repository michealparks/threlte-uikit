import { describe, expect, it } from 'vitest'
import { render } from '@threlte/test'

import Subject from './Events.spec.svelte'

describe('Events', () => {
  it('should not add non-interactive elements to the intersect objects', () => {
    const { component } = render(Subject)
    expect(component.interactivity.interactiveObjects.length).toBe(0)
  })
})
