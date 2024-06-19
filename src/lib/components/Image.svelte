<script lang="ts">
  import { Group, type Texture } from 'three'
  import { createImage, type EventHandlers, type ImageProperties } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { T, currentWritable } from '@threlte/core'
  import { usePropertySignals } from '$lib/usePropSignals'
  import AddHandlers from './AddHandlers.svelte'
  import { useInternals } from '$lib/useInternals'

  type $$Props = ImageProperties & {
    ref?: ReturnType<typeof createImage>
    name?: string
    src?: string | Texture
  } & EventHandlers

  export let name: $$Props['name'] = undefined

  const parent = useParent()
  const outerRef = currentWritable(new Group())
  const innerRef = currentWritable(new Group())
  const propertySignals = usePropertySignals($$restProps)
  $: propertySignals.properties.value = $$restProps

  const internals = createImage(
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
  ref={$outerRef}
  handlers={internals.handlers}
>
  <T is={internals.interactionPanel} />
  <T
    is={$innerRef}
    matrixAutoUpdate={false}
  >
    <slot />
  </T>
</AddHandlers>
