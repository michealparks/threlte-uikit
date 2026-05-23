import type { EventHandlers as EventHandlersProperties } from '@pmndrs/uikit'
import type { ReadonlySignal } from '@preact/signals-core'

import { fromStore } from 'svelte/store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WrappedHandler = ((event: any) => void) | undefined

type SvelteHandlerKey =
  | 'onclick'
  | 'oncontextmenu'
  | 'ondblclick'
  | 'onpointercancel'
  | 'onpointerdown'
  | 'onpointerenter'
  | 'onpointerleave'
  | 'onpointermove'
  | 'onpointerout'
  | 'onpointerover'
  | 'onpointerup'
  | 'onwheel'

export type WrappedHandlers = Record<SvelteHandlerKey, WrappedHandler>

const uikitToSvelteKeys: Array<[keyof EventHandlersProperties, SvelteHandlerKey]> = [
  ['onClick', 'onclick'],
  ['onContextMenu', 'oncontextmenu'],
  ['onDblClick', 'ondblclick'],
  ['onPointerCancel', 'onpointercancel'],
  ['onPointerDown', 'onpointerdown'],
  ['onPointerEnter', 'onpointerenter'],
  ['onPointerLeave', 'onpointerleave'],
  ['onPointerMove', 'onpointermove'],
  ['onPointerOut', 'onpointerout'],
  ['onPointerOver', 'onpointerover'],
  ['onPointerUp', 'onpointerup'],
  ['onWheel', 'onwheel'],
]

const disableKeys = new Set<SvelteHandlerKey>(['onpointerdown', 'onwheel'])
const enableKeys = new Set<SvelteHandlerKey>([
  'onpointerup',
  'onpointerleave',
  'onpointercancel',
])

export const createHandlers = (
  handlers: ReadonlySignal<EventHandlersProperties>,
  disableControls?: () => void,
  enableControls?: () => void
) => {
  const reactiveHandlers = fromStore(handlers)

  const allHandlers = $derived.by<WrappedHandlers>(() => {
    const obj: WrappedHandlers = {
      onclick: undefined,
      oncontextmenu: undefined,
      ondblclick: undefined,
      onpointercancel: undefined,
      onpointerdown: undefined,
      onpointerenter: undefined,
      onpointerleave: undefined,
      onpointermove: undefined,
      onpointerout: undefined,
      onpointerover: undefined,
      onpointerup: undefined,
      onwheel: undefined,
    }
    const h = reactiveHandlers.current

    for (const [uikitKey, svelteKey] of uikitToSvelteKeys) {
      const handler = h[uikitKey]
      if (handler != null) {
        // uikit handlers destructure `pointerId` from the top-level event object
        // (e.g. `({ pointerId }) => { if (pointerId == null) return; ... }`).
        // Threlte puts the native PointerEvent in `event.nativeEvent`. DOM Event
        // properties are not enumerable own properties, so `{ ...event.nativeEvent }`
        // gives `{}` — pointerId is never spread in. We explicitly copy it.

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        obj[svelteKey] = (event: any) => {
          const native = event?.nativeEvent
          if (disableKeys.has(svelteKey)) disableControls?.()
          else if (enableKeys.has(svelteKey)) enableControls?.()
          handler(native != null ? { pointerId: native.pointerId, ...event } : event)
        }
      }
    }

    return obj
  })

  return {
    get current(): WrappedHandlers {
      return allHandlers
    },
  }
}
