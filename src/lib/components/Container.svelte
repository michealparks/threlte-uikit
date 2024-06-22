<script lang="ts">
  import { Group } from 'three'
  import { T, currentWritable } from '@threlte/core'
  import {
    type ContainerProperties,
    createContainer,
    type EventHandlers,
  } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { useInternals, type ContainerRef } from '$lib/useInternals'
  import AddHandlers from './AddHandlers.svelte'

  type $$Props = ContainerProperties & {
    ref?: ContainerRef
    name?: string
  } & EventHandlers

  export let name: $$Props['name'] = undefined

  const parent = useParent()
  const outerRef = currentWritable(new Group())
  const innerRef = currentWritable(new Group())
  const propertySignals = usePropertySignals({ ...$$restProps })
  $: props = { ...$$restProps }
  $: propertySignals.properties.value = props

  $: internals = createContainer(
    $parent,
    propertySignals.style,
    propertySignals.properties,
    propertySignals.default,
    outerRef,
    innerRef
  )
  $: internals.interactionPanel.name = name ?? ''

  export let ref: ContainerRef | undefined = undefined

  $: ref = useInternals<ContainerProperties>(
    internals,
    propertySignals.style,
    $parent.root.pixelSize
  )

  const parentContext = createParent(internals)
  $: parentContext.set(internals)
</script>

<AddHandlers
  userHandlers={props}
  handlers={internals.handlers}
  ref={$outerRef}
>
  <T is={internals.interactionPanel} />
  <T
    matrixAutoUpdate={false}
    is={$innerRef}
  >
    <slot />
  </T>
</AddHandlers>
