import type { EventHandlers, ThreeEvent } from '@pmndrs/uikit/internals'

type EventCallback<T> = (event: ThreeEvent<T>) => void
type Events =
  | 'click'
  | 'contextmenu'
  | 'doubleclick'
  | 'pointermove'
  | 'wheel'
  | 'pointerdown'
  | 'pointerenter'
  | 'pointerleave'
  | 'pointermissed'
  | 'pointerout'
  | 'pointerover'
  | 'pointerup'

export const createEvents = (
  rest: EventHandlers,
  spy: <T>(type: Events, arg?: EventCallback<T>) => EventCallback<T> | undefined
): EventHandlers => {
  return {
    onClick: rest.onClick ? spy('click', rest.onClick) : undefined,
    onContextMenu: rest.onContextMenu ? spy('contextmenu', rest.onContextMenu) : undefined,
    onDoubleClick: rest.onDoubleClick ? spy('doubleclick', rest.onDoubleClick) : undefined,
    onPointerMove: rest.onPointerMove ? spy('pointermove', rest.onPointerMove) : undefined,
    onWheel: rest.onWheel ? spy('wheel', rest.onWheel) : undefined,

    onPointerDown: spy('pointerdown', rest.onPointerDown),
    onPointerEnter: spy('pointerenter', rest.onPointerEnter),
    onPointerLeave: spy('pointerleave', rest.onPointerLeave),
    onPointerMissed: spy('pointermissed', rest.onPointerMissed),
    onPointerOut: spy('pointerout', rest.onPointerOut),
    onPointerOver: spy('pointerover', rest.onPointerOver),
    onPointerUp: spy('pointerup', rest.onPointerUp),
  }
}
