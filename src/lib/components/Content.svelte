<script lang="ts">
  import type { EventHandlers } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { T, currentWritable } from '@threlte/core'
  import { Object3D } from 'three'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { type ContentProperties, createContent } from '@pmndrs/uikit/internals'
  import AddHandlers from './AddHandlers.svelte'
  import { useInternals, type ComponentInternals } from '$lib/useInternals'

  type $$Props = ContentProperties & {
    ref?: ComponentInternals<ContentProperties>
    name?: string
  } & EventHandlers

  export let name: $$Props['name'] = undefined

  const parent = useParent()
  const outerRef = currentWritable(new Object3D())
  const innerRef = currentWritable(new Object3D())
  const propertySignals = usePropertySignals($$restProps)
  $: propertySignals.properties.value = $$restProps

  const internals = createContent(
    parent,
    propertySignals.style,
    propertySignals.properties,
    propertySignals.default,
    outerRef,
    innerRef
  )
  $: internals.interactionPanel.name = name ?? ''

  export const ref = useInternals<ContentProperties>(
    internals,
    propertySignals.style,
    parent.root.pixelSize
  )

  createParent(undefined!)
</script>

<AddHandlers
  userHandlers={$$restProps}
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
