<script lang="ts">
  import { signal } from '@preact/signals-core'
  import {
    createText,
    type EventHandlers,
    type FontFamilies,
    type TextProperties,
  } from '@pmndrs/uikit/internals'
  import { useParent } from '$lib/useParent'
  import { T, currentWritable } from '@threlte/core'
  import { Group } from 'three'
  import { useFontFamilies } from '$lib/useFontFamilies'
  import { usePropertySignals } from '$lib/usePropSignals'
  import AddHandlers from './AddHandlers.svelte'
  import { useInternals, type ComponentInternals } from '$lib/useInternals'

  type $$Props = TextProperties & {
    ref?: ComponentInternals<TextProperties>
    name?: string
    text: string
  } & EventHandlers

  export let name: string | undefined = undefined
  export let text: $$Props['text']

  const parent = useParent()
  const outerRef = currentWritable(new Group())

  const propertySignals = usePropertySignals($$restProps)
  $: propertySignals.properties.value = $$restProps

  const textSignal = signal(text)
  $: textSignal.value = text

  const fontContext = useFontFamilies()
  const fontFamilies = signal<FontFamilies | undefined>(fontContext)
  $: fontFamilies.value = fontContext

  const internals = createText(
    parent,
    textSignal,
    fontFamilies,
    propertySignals.style,
    propertySignals.properties,
    propertySignals.default,
    outerRef
  )
  $: internals.interactionPanel.name = name ?? ''

  export const ref = useInternals(internals, propertySignals.style, parent.root.pixelSize)
</script>

<AddHandlers
  allowSkippingChildren
  userHandlers={$$restProps}
  handlers={internals.handlers}
  ref={$outerRef}
>
  <T is={internals.interactionPanel} />
</AddHandlers>
