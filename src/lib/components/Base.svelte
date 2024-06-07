<script lang="ts">
  import { createEvents } from './events'
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
  import { T, useThrelte } from '@threlte/core'

  type T = $$Generic<Container | CustomContainer | Root | Fullscreen | Text | Image | Content | Svg>

  type $$Props = {
    is: T
    name?: string
  } & EventHandlers &
    AllOptionalProperties

  export let is: $$Props['is']
  export let name: $$Props['name'] = undefined

  const makeEvents = () => {
    return createEvents($$restProps, (type, fn) => {
      return (event) => {
        if ('type' in event) {
          return
        }

        ;(is as Container).dispatchEvent({
          nativeEvent: event.nativeEvent,
          target: is,
          type,
        })

        invalidate()
        fn?.(event)
      }
    })
  }

  let events = makeEvents()
  $: events = makeEvents()

  const { invalidate } = useThrelte()

  $: is.setProperties($$restProps)

  $: is.name = name ?? ''

  onMount(() => {
    return () => {
      is.destroy()
    }
  })
</script>

<T
  {is}
  on:click={events.onClick}
  on:contextmenu={events.onContextMenu}
  on:ondblclick={events.onDoubleClick}
  on:pointerdown={events.onPointerDown}
  on:pointerenter={events.onPointerEnter}
  on:pointerleave={events.onPointerLeave}
  on:pointermissed={events.onPointerMissed}
  on:pointermove={events.onPointerMove}
  on:pointerout={events.onPointerOut}
  on:pointerover={events.onPointerOver}
  on:pointerup={events.onPointerUp}
  on:wheel={events.onWheel}
>
  <slot />
</T>
