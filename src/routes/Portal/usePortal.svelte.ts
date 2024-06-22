import { useThrelteUserContext } from '@threlte/core'
import type { Snippet } from 'svelte'

type PortalContext = {
  addPortal: (id: string) => { value: Snippet[] }
  addSnippet: (id: string, snippet: Snippet) => void
  removeSnippet: (id: string, snippet: Snippet) => void
  removePortal: (id: string) => void
}

const createPortalContext = (): PortalContext => {
  const portals = $state<Record<string, Snippet[]>>({})

  const addPortal = (id: string) => {
    if (portals[id]) {
      console.warn(`Portal with id ${id} already exists. Skipping portal creation.`)
      return { value: portals[id] }
    } else {
      portals[id] = []
      return { value: portals[id] }
    }
  }

  const addSnippet = (portalId: string, snippet: Snippet) => {
    const portal = portals[portalId]
    portal?.push(snippet)
  }

  const removeSnippet = (portalId: string, snippet: Snippet) => {
    const portal = portals[portalId]
    portal?.splice(portal.indexOf(snippet), 1)
  }

  const removePortal = (id: string) => {
    if (!portals[id]) {
      console.warn(`Portal with id ${id} does not exist. Skipping portal removal.`)
    } else {
      delete portals[id]
    }
    return portals
  }

  return {
    addPortal,
    addSnippet,
    removeSnippet,
    removePortal,
  }
}

export const usePortal = () => {
  return useThrelteUserContext('threlte-portals', createPortalContext())
}
