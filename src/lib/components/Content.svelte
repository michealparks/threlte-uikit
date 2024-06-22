<script lang="ts">
  import { Object3D } from 'three'
  import { T, currentWritable } from '@threlte/core'
  import {
    type ContentProperties,
    type EventHandlers,
    createContent,
  } from '@pmndrs/uikit/internals'
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

  export let ref = useInternals<ContentProperties>(internals, style, parent.root.pixelSize)

  createParent(undefined!)
</script>

<AddHandlers
  userHandlers={props}
  handlers={internals.handlers}
  ref={$outerRef}
>
  <T is={internals.interactionPanel} />
  <T
    is={$innerRef}
    matrixAutoUpdate={false}
  >
    <slot />
  </T>
</AddHandlers>
