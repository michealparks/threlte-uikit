import { type CurrentWritable, currentWritable } from '@threlte/core'
import { type Snippet } from 'svelte'

const portals = currentWritable<Record<string, CurrentWritable<Snippet[]>>>({})

export const usePortal = () => {
	const addPortal = (id: string) => {
		portals.update(($portals) => {
			$portals[id] = currentWritable([])
			return $portals
		})
		return () => {
			portals.update(($portals) => {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete $portals[id]
				return $portals
			})
		}
	}

	const addChild = (id: string, child: Snippet) => {
		portals.current[id]?.update(($children) => {
			$children.push(child)
			return $children
		})
		return () => {
			portals.current[id]?.update(($children) => {
				$children.splice($children.indexOf(child), 1)
				return $children
			})
		}
	}

	return {
		addChild,
		addPortal,
		portals,
	}
}
