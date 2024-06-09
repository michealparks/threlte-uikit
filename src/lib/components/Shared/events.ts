import type { ThreeEvent } from '@pmndrs/uikit'

export const eventNames = [
  'click',
  'contextmenu',
  'doubleclick',
  'pointermove',
  'wheel',
  'pointerdown',
  'pointerenter',
  'pointerleave',
  'pointermissed',
  'pointerout',
  'pointerover',
  'pointerup',
] as const

export const eventPropNames = [
  'onClick',
  'onContextMenu',
  'onDoubleClick',
  'onPointerMove',
  'onWheel',
  'onPointerDown',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerMissed',
  'onPointerOut',
  'onPointerOver',
  'onPointerUp',
] as const

export type EventName = (typeof eventNames)[number]

export type EventCallback<T> = (event: ThreeEvent<T>) => void

export const hasPointerEvents = (props: Record<string, unknown>) => {
  for (const name of eventPropNames) {
    if (props[name] !== undefined) {
      return true
    }
  }

  return false
}
