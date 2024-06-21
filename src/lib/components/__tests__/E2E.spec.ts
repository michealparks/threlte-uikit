import { render } from '@threlte/test'
import { describe, expect, it } from 'vitest'
import Subject from './E2E.spec.svelte'

describe('E2E', () => {
  it('generates a root, container, and text in the scene graph', () => {
    const { scene } = render(Subject)
    const root = scene.getObjectByName('root')
    const container = scene.getObjectByName('container')
    const text = scene.getObjectByName('text')

    expect(root).toBeDefined()
    expect(container).toBeDefined()
    expect(text).toBeDefined()

    expect(text?.parent?.parent).toBe(container)
    expect(container?.parent?.parent).toBe(root)
  })

  it('fires events', () => {})
})
