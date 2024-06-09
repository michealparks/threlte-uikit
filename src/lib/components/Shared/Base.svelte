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

  $: props = $$restProps
  $: needsEvents =
    props.hover !== undefined || props.active !== undefined || hasPointerEvents(props)

  const createHandler = (type: EventName, fn?: EventCallback<any>, required = false) => {
    if (fn === undefined) {
      if (required && !props.hover && !props.active) {
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

  $: is.setProperties(props)
  $: is.name = name ?? ''

  onMount(() => {
    return () => {
      is.destroy()
    }
  })
</script>

{#if needsEvents}
  <T
    {is}
    on:click={createHandler('click', props.onClick)}
    on:contextmenu={createHandler('contextmenu', props.onClick)}
    on:ondblclick={createHandler('doubleclick', props.onDoubleClick)}
    on:pointerdown={createHandler('pointerdown', props.onPointerDown, true)}
    on:pointerenter={createHandler('pointerenter', props.onPointerEnter, true)}
    on:pointerleave={createHandler('pointerleave', props.onPointerLeave, true)}
    on:pointermissed={createHandler('pointermissed', props.onPointerMissed)}
    on:pointermove={createHandler('pointermove', props.onPointerMove)}
    on:pointerout={createHandler('pointerout', props.onPointerOut, true)}
    on:pointerover={createHandler('pointerover', props.onPointerOver, true)}
    on:pointerup={createHandler('pointerup', props.onPointerUp, true)}
    on:wheel={createHandler('wheel', props.onWheel)}
  >
    <slot />
  </T>
{:else}
  <T {is}><slot /></T>
{/if}
