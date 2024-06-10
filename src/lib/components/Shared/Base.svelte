<script lang="ts">
  import type {
    Container,
    CustomContainer,
    Root,
    Text,
    Image,
    Fullscreen,
    EventHandlers,
    Content,
    Svg,
  } from '@pmndrs/uikit'

  import { onMount } from 'svelte'
  import { T } from '@threlte/core'
  import { type EventName, type EventCallback, hasPointerEvents } from './events'

  type T = $$Generic<Container | CustomContainer | Root | Fullscreen | Text | Image | Content | Svg>

  type $$Props = {
    hover: boolean
    active: boolean
    is: T
    events: EventHandlers
    name?: string
  } & EventHandlers

  export let is: $$Props['is']
  export let events: EventHandlers
  export let hover: boolean
  export let active: boolean
  export let name: string | undefined = undefined

  $: needsEvents = hover || active || hasPointerEvents(events)

  const createHandler = (type: EventName, fn?: EventCallback<any>, required = false) => {
    if (fn === undefined) {
      if (required && !hover && !active) {
        return
      } else if (!required) {
        return
      }
    }

    return (event: Event) => {
      if ('type' in event) {
        return
      }

      ;(is as Container).dispatchEvent({
        nativeEvent: event.nativeEvent,
        target: is,
        type,
      })

      fn?.(event)
    }
  }

  onMount(() => {
    return () => {
      is.destroy()
    }
  })

  $: if (name) is.name = name
</script>

{#if needsEvents}
  <T
    {is}
    on:click={createHandler('click', events.onClick)}
    on:contextmenu={createHandler('contextmenu', events.onContextMenu)}
    on:ondblclick={createHandler('doubleclick', events.onDoubleClick)}
    on:pointerdown={createHandler('pointerdown', events.onPointerDown, true)}
    on:pointerenter={createHandler('pointerenter', events.onPointerEnter, true)}
    on:pointerleave={createHandler('pointerleave', events.onPointerLeave, true)}
    on:pointermissed={createHandler('pointermissed', events.onPointerMissed)}
    on:pointermove={createHandler('pointermove', events.onPointerMove)}
    on:pointerout={createHandler('pointerout', events.onPointerOut, true)}
    on:pointerover={createHandler('pointerover', events.onPointerOver, true)}
    on:pointerup={createHandler('pointerup', events.onPointerUp, true)}
    on:wheel={createHandler('wheel', events.onWheel)}
  >
    <slot />
  </T>
{:else}
  <T {is}><slot /></T>
{/if}
