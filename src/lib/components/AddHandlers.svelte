<script lang="ts">
  import type { Object3D } from 'three'
  import { T } from '@threlte/core'
  import { type EventHandlers, addHandler } from '@pmndrs/uikit/internals'
  import type { Readable } from 'svelte/store'

  export let ref: Object3D
  export let userHandlers: EventHandlers
  export let handlers: Readable<EventHandlers>

  const eventHandlerKeys: Array<keyof EventHandlers> = [
    'onClick',
    'onContextMenu',
    'onDoubleClick',
    'onPointerCancel',
    'onPointerDown',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerMissed',
    'onPointerMove',
    'onPointerOut',
    'onPointerOver',
    'onPointerUp',
    'onWheel',
  ]

  const createHandlers = (userFns: EventHandlers, fns?: EventHandlers) => {
    const result: EventHandlers = { ...fns }
    const keysLength = eventHandlerKeys.length

    for (let i = 0; i < keysLength; i += 1) {
      const key = eventHandlerKeys[i]
      addHandler(key, result, userFns[key])
    }

    if (Object.keys(result).length === 0) {
      return undefined
    }

    return result
  }

  $: allHandlers = createHandlers(userHandlers, $handlers)
</script>

{#if allHandlers !== undefined}
  <T
    is={ref}
    matrixAutoUpdate={false}
    on:click={allHandlers.onClick}
    on:contextmenu={allHandlers.onContextMenu}
    on:dblclick={allHandlers.onDoubleClick}
    on:pointerdown={allHandlers.onPointerDown}
    on:pointerenter={allHandlers.onPointerEnter}
    on:pointerleave={allHandlers.onPointerLeave}
    on:pointermissed={allHandlers.onPointerMissed}
    on:pointermove={allHandlers.onPointerMove}
    on:pointerout={allHandlers.onPointerOut}
    on:pointerover={allHandlers.onPointerOver}
    on:pointerup={allHandlers.onPointerUp}
    on:wheel={allHandlers.onWheel}
  >
    <slot />
  </T>
{:else}
  <T
    is={ref}
    matrixAutoUpdate={false}
  >
    <slot />
  </T>
{/if}
