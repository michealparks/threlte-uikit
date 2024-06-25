<script
  context="module"
  lang="ts"
>
  import type { Object3D } from 'three'
  import { T } from '@threlte/core'
  import type { EventHandlers } from '$lib/Events'

  const eventHandlerKeys: Array<keyof EventHandlers> = [
    'onclick',
    'oncontextmenu',
    'ondblclick',
    'onpointercancel',
    'onpointerdown',
    'onpointerenter',
    'onpointerleave',
    'onpointermissed',
    'onpointermove',
    'onpointerout',
    'onpointerover',
    'onpointerup',
    'onwheel',
  ] as const
</script>

<script lang="ts">
  export let ref: Object3D
  export let userHandlers: EventHandlers
  export let handlers: EventHandlers

  let count = 0

  $: {
    count = 0
    for (const key of eventHandlerKeys) {
      const userHandler = userHandlers[key]
      const existingHandler = handlers[key]

      if (userHandler !== undefined) {
        if (existingHandler === undefined) {
          handlers[key] = userHandler
        } else {
          handlers[key] = (event) => {
            existingHandler?.(event)
            if ('stopped' in event && event.stopped) {
              return
            }

            userHandler(event)
          }
        }
        count += 1
      } else if (existingHandler !== undefined) {
        count += 1
      }
    }
  }
</script>

<!-- 
  Remove this count checker once the interactivity plugin 
  checks for "undefined" values when deciding what to add
  as a raycast object.
-->
{#if count > 0}
  <T
    is={ref}
    matrixAutoUpdate={false}
    on:click={handlers.onclick}
    on:contextmenu={handlers.oncontextmenu}
    on:dblclick={handlers.ondblclick}
    on:pointerdown={handlers.onpointerdown}
    on:pointerenter={handlers.onpointerenter}
    on:pointerleave={handlers.onpointerleave}
    on:pointermissed={handlers.onpointermissed}
    on:pointermove={handlers.onpointermove}
    on:pointerout={handlers.onpointerout}
    on:pointerover={handlers.onpointerover}
    on:pointerup={handlers.onpointerup}
    on:wheel={handlers.onwheel}
    {...handlers}
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
