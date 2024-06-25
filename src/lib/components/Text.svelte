<script lang="ts">
  import { Group } from 'three'
  import { T, currentWritable } from '@threlte/core'
  import { signal } from '@preact/signals-core'
  import { createText, type FontFamilies, type TextProperties } from '@pmndrs/uikit/internals'
  import type { EventHandlers } from '$lib/Events'
  import { useFontFamilies } from '$lib/useFontFamilies'
  import { useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { useInternals, type TextRef } from '$lib/useInternals'
  import AddHandlers from './AddHandlers.svelte'

  type $$Props = TextProperties & {
    ref?: TextRef
    name?: string
    text: string
  } & EventHandlers

  export let name: string | undefined = undefined
  export let text: $$Props['text']

  const parent = useParent()
  const outerRef = currentWritable(new Group())

  const { style, properties, defaults } = usePropertySignals<TextProperties>()
  $: props = { ...$$restProps }
  $: properties.value = props

  const textSignal = signal(text)
  $: textSignal.value = text

  const fontContext = useFontFamilies()
  const fontFamilies = signal<FontFamilies | undefined>(fontContext)
  $: fontFamilies.value = fontContext

  const internals = createText(
    parent,
    textSignal,
    fontFamilies,
    style,
    properties,
    defaults,
    outerRef
  )
  $: internals.interactionPanel.name = name ?? ''

  export let ref: TextRef | undefined = undefined
  ref = useInternals(internals, style, parent.root.pixelSize)

  const internalsHandlers = internals.handlers
  $: handlers = $internalsHandlers
</script>

<AddHandlers
  ref={$outerRef}
  userHandlers={props}
  handlers={{
    onclick: handlers.onClick,
    oncontextmenu: handlers.onContextMenu,
    ondblclick: handlers.onDoubleClick,
    onpointercancel: handlers.onPointerCancel,
    onpointerdown: handlers.onPointerDown,
    onpointerenter: handlers.onPointerEnter,
    onpointerleave: handlers.onPointerLeave,
    onpointermissed: handlers.onPointerMissed,
    onpointermove: handlers.onPointerMove,
    onpointerout: handlers.onPointerOut,
    onpointerover: handlers.onPointerOver,
    onpointerup: handlers.onPointerUp,
  }}
>
  <T is={internals.interactionPanel} />
</AddHandlers>
