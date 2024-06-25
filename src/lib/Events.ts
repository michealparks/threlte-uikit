import type { Intersection } from 'three'

export type ThreeEvent<TSourceEvent> = Intersection & {
  nativeEvent: TSourceEvent
  defaultPrevented?: boolean
  stopped?: boolean
  stopPropagation?: () => void
}

export type KeyToEvent<K extends keyof EventHandlers> = Parameters<Required<EventHandlers>[K]>[0]

export type EventHandlers = {
  onclick?: (event: ThreeEvent<MouseEvent>) => void
  oncontextmenu?: (event: ThreeEvent<MouseEvent>) => void
  ondblclick?: (event: ThreeEvent<MouseEvent>) => void
  onpointerup?: (event: ThreeEvent<PointerEvent>) => void
  onpointerdown?: (event: ThreeEvent<PointerEvent>) => void
  onpointerover?: (event: ThreeEvent<PointerEvent>) => void
  onpointerout?: (event: ThreeEvent<PointerEvent>) => void
  onpointerenter?: (event: ThreeEvent<PointerEvent>) => void
  onpointerleave?: (event: ThreeEvent<PointerEvent>) => void
  onpointermove?: (event: ThreeEvent<PointerEvent>) => void
  onpointermissed?: (event: MouseEvent) => void
  onpointercancel?: (event: ThreeEvent<PointerEvent>) => void
  onwheel?: (event: ThreeEvent<WheelEvent>) => void
}
