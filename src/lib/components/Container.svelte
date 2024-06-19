<script lang="ts">
  import {
    type ContainerProperties,
    createContainer,
    type EventHandlers,
  } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { Group } from 'three'
  import { T, currentWritable } from '@threlte/core'
  import AddHandlers from './AddHandlers.svelte'
  import { useInternals } from '$lib/useInternals'

  type $$Props = ContainerProperties & {
    ref?: ReturnType<typeof createContainer>
    name?: string
  } & EventHandlers

  export let name: $$Props['name'] = undefined

  const parent = useParent()
  const outerRef = currentWritable(new Group())
  const innerRef = currentWritable(new Group())
  const propertySignals = usePropertySignals($$restProps)
  $: propertySignals.properties.value = $$restProps

  const internals = createContainer(
    parent,
    propertySignals.style,
    propertySignals.properties,
    propertySignals.default,
    outerRef,
    innerRef
  )
  $: internals.interactionPanel.name = name ?? ''

  export const ref = internals

  useInternals(internals)
  createParent(internals)
</script>

<AddHandlers
  userHandlers={$$restProps}
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
