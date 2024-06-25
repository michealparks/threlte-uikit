<script lang="ts">
  import { Object3D } from 'three'
  import { T, currentWritable } from '@threlte/core'
  import { type ContentProperties, createContent } from '@pmndrs/uikit/internals'
  import type { EventHandlers } from '$lib/Events'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { useInternals, type ContentRef } from '$lib/useInternals'
  import AddHandlers from './AddHandlers.svelte'

  type $$Props = ContentProperties & {
    ref?: ContentRef
    name?: string
  } & EventHandlers

  export let name: $$Props['name'] = undefined

  const parent = useParent()
  const outerRef = currentWritable(new Object3D())
  const innerRef = currentWritable(new Object3D())
  const { style, properties, defaults } = usePropertySignals<ContentProperties>()

  $: props = { ...$$restProps }
  $: properties.value = props

  const internals = createContent(parent, style, properties, defaults, outerRef, innerRef)
  $: internals.interactionPanel.name = name ?? ''

  export let ref: ContentRef | undefined = undefined
  ref = useInternals<ContentProperties>(internals, style, parent.root.pixelSize)

  createParent(undefined!)

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
  <T
    is={$innerRef}
    matrixAutoUpdate={false}
  >
    <slot />
  </T>
</AddHandlers>
