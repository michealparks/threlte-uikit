<script lang="ts">
  import { Group } from 'three'
  import { T, currentWritable } from '@threlte/core'
  import { createImage, type ImageProperties } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { useInternals } from '$lib/useInternals'
  import AddHandlers from '../AddHandlers.svelte'
  import type { Props } from './Image.svelte'

  type $$Props = Props

  export let name: Props['name'] = undefined

  const parent = useParent()
  const outerRef = currentWritable(new Group())
  const innerRef = currentWritable(new Group())
  const { style, properties, defaults } = usePropertySignals<ImageProperties>()
  $: props = { ...$$restProps }
  $: properties.value = props

  const internals = createImage(parent, style, properties, defaults, outerRef, innerRef)
  $: internals.interactionPanel.name = name ?? ''

  export let ref: Props['ref'] = undefined
  ref = useInternals(internals, style, parent.root.pixelSize)

  createParent(internals)

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
