<script lang="ts">
  import { Group } from 'three'
  import { T, currentWritable } from '@threlte/core'
  import { signal } from '@preact/signals-core'
  import {
    createText,
    type EventHandlers,
    type FontFamilies,
    type TextProperties,
  } from '@pmndrs/uikit/internals'
  import { useFontFamilies } from '$lib/useFontFamilies'
  import { useParent } from '$lib/useParent'
  import { usePropertySignals } from '$lib/usePropSignals'
  import { useInternals, type TextRef } from '$lib/useInternals'
  import AddHandlers from './AddHandlers.svelte'

  type $$Props = TextProperties & {
    ref?: TextRef
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
  userHandlers={$$restProps}
  handlers={internals.handlers}
  ref={$outerRef}
>
  <T is={internals.interactionPanel} />
</AddHandlers>
