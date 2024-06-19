<script lang="ts">
  import { type EventHandlers, type SvgProperties, createSvg } from '@pmndrs/uikit/internals'
  import { createParent, useParent } from '$lib/useParent'
  import { T, currentWritable } from '@threlte/core'
  import { Object3D } from 'three'
  import { usePropertySignals } from '$lib/usePropSignals'
  import AddHandlers from './AddHandlers.svelte'
  import { useInternals } from '$lib/useInternals'

  type $$Props = SvgProperties & {
    ref?: ReturnType<typeof createSvg>
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
  <T is={internals.centerGroup} />
  <T
    is={$innerRef}
    matrixAutoUpdate={false}
  >
    <slot />
  </T>
</AddHandlers>
