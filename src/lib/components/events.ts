import type { EventHandlers, ThreeEvent } from '@pmndrs/uikit/internals'

type EventCallback<T> = (event: ThreeEvent<T>) => void
type Events =
	| 'click'
	| 'contextMenu'
	| 'doubleClick'
	| 'pointerMove'
	| 'wheel'
	| 'pointerDown'
	| 'pointerEnter'
	| 'pointerLeave'
	| 'pointerMissed'
	| 'pointerOut'
	| 'pointerOver'
	| 'pointerUp'

export const createEvents = (
	rest: EventHandlers,
	spy: <T>(type: Events, arg?: EventCallback<T>) => EventCallback<T> | undefined
): EventHandlers => {
	return {
		onClick: rest.onClick ? spy('click', rest.onClick) : undefined,
		onContextMenu: rest.onContextMenu ? spy('contextMenu', rest.onContextMenu) : undefined,
		onDoubleClick: rest.onDoubleClick ? spy('doubleClick', rest.onDoubleClick) : undefined,
		onPointerMove: rest.onPointerMove ? spy('pointerMove', rest.onPointerMove) : undefined,
		onWheel: rest.onWheel ? spy('wheel', rest.onWheel) : undefined,

		onPointerDown: spy('pointerDown', rest.onPointerDown),
		onPointerEnter: spy('pointerEnter', rest.onPointerEnter),
		onPointerLeave: spy('pointerLeave', rest.onPointerLeave),
		onPointerMissed: spy('pointerMissed', rest.onPointerMissed),
		onPointerOut: spy('pointerOut', rest.onPointerOut),
		onPointerOver: spy('pointerOver', rest.onPointerOver),
		onPointerUp: spy('pointerUp', rest.onPointerUp),
	}
}
