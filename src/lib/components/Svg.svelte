<script lang="ts">
  import { Object3D } from 'three'
  import { T, currentWritable } from '@threlte/core'
  import { type EventHandlers, type SvgProperties, createSvg } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { useInternals, type SvgRef } from '$lib/useInternals'
  import AddHandlers from './AddHandlers.svelte'

  type $$Props = SvgProperties & {
    ref?: SvgRef
    name?: string
    src: string
  } & EventHandlers

  export let name: string | undefined = undefined

  const parent = useParent()
  const outerRef = currentWritable(new Object3D())
  const innerRef = currentWritable(new Object3D())
  const propertySignals = usePropertySignals($$restProps)
  $: propertySignals.properties.value = $$restProps

  const internals = createSvg(
    parent,
    propertySignals.style,
    propertySignals.properties,
    propertySignals.default,
    outerRef,
    innerRef
  )
  $: internals.interactionPanel.name = name ?? ''

  export let ref = useInternals(internals, propertySignals.style, parent.root.pixelSize)

  createParent(internals)
</script>

<AddHandlers
  userHandlers={$$restProps}
  ref={$outerRef}
  handlers={internals.handlers}
>
  <T is={internals.interactionPanel} />
  <T is={internals.centerGroup} />
  <T
    is={$innerRef}
    matrixAutoUpdate={false}
  >
    <slot />
  </T>
</AddHandlers>
