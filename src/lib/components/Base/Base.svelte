<script lang="ts">
  import type {
    AllOptionalProperties,
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
    is: T
    name?: string
  } & EventHandlers &
    AllOptionalProperties

  export let is: $$Props['is']
  export let name: $$Props['name'] = undefined

  const createHandler = (type: EventName, fn?: EventCallback<any>, required = false) => {
    if (fn === undefined) {
      if (required && !$$restProps.hover && !$$restProps.active) {
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

  $: is.setProperties($$restProps)

  $: is.name = name ?? ''

  onMount(() => {
    return () => {
      is.destroy()
    }
  })

  $: rest = $$restProps
  $: needsEvents = rest.hover !== undefined || rest.active !== undefined || hasPointerEvents(rest)
</script>

{#if needsEvents}
  <T
    {is}
    on:click={createHandler('click', rest.onClick)}
    on:contextmenu={createHandler('contextmenu', rest.onClick)}
    on:ondblclick={createHandler('doubleclick', rest.onDoubleClick)}
    on:pointerdown={createHandler('pointerdown', rest.onPointerDown, true)}
    on:pointerenter={createHandler('pointerenter', rest.onPointerEnter, true)}
    on:pointerleave={createHandler('pointerleave', rest.onPointerLeave, true)}
    on:pointermissed={createHandler('pointermissed', rest.onPointerMissed)}
    on:pointermove={createHandler('pointermove', rest.onPointerMove)}
    on:pointerout={createHandler('pointerout', rest.onPointerOut, true)}
    on:pointerover={createHandler('pointerover', rest.onPointerOver, true)}
    on:pointerup={createHandler('pointerup', rest.onPointerUp, true)}
    on:wheel={createHandler('wheel', rest.onWheel)}
  >
    <slot />
  </T>
{:else}
  <T {is}><slot /></T>
{/if}
