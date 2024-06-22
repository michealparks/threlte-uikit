<script lang="ts">
  import { Group, type Texture } from 'three'
  import { T, currentWritable } from '@threlte/core'
  import { createImage, type EventHandlers, type ImageProperties } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { useInternals, type ImageRef } from '$lib/useInternals'
  import AddHandlers from './AddHandlers.svelte'

  type $$Props = ImageProperties & {
    ref?: ImageRef
    name?: string
    src?: string | Texture
  } & EventHandlers

  export let name: $$Props['name'] = undefined

  const parent = useParent()
  const outerRef = currentWritable(new Group())
  const innerRef = currentWritable(new Group())
  const propertySignals = usePropertySignals({ ...$$restProps })
  $: props = { ...$$restProps }
  $: propertySignals.properties.value = $$restProps

  $: internals = createImage(
    $parent,
    propertySignals.style,
    propertySignals.properties,
    propertySignals.default,
    outerRef,
    innerRef
  )
  $: internals.interactionPanel.name = name ?? ''

  export let ref: ImageRef | undefined = undefined

  $: ref = useInternals(internals, propertySignals.style, $parent.root.pixelSize)

  const parentContext = createParent(internals)
  $: parentContext.set(internals)
</script>

<AddHandlers
  userHandlers={props}
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
