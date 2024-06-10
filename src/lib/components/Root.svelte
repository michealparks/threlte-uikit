<script lang="ts">
  import Base from './Shared/Base.svelte'
  import type { EventHandlers, InheritableRootProperties } from '@pmndrs/uikit/internals'
  import { Root } from '@pmndrs/uikit'
  import { signal } from '@preact/signals-core'
  import { useThrelte, useTask } from '@threlte/core'
  import { useFontFamilies } from '../useFontFamilies'
  import { useDefaultProperties } from '../useDefaultProperties'
  import { eventPropNames } from './Shared/events'
  import type { Writable } from 'type-fest'

  type Properties = Writable<InheritableRootProperties>
  type $$Props = {
    name?: string
    ref?: Root
  } & Properties &
    EventHandlers

  export let name: string | undefined = undefined
  export let active: Properties['active'] = undefined
  export let hover: Properties['hover'] = undefined

  const { camera, renderer, shouldRender, scheduler, renderStage } = useThrelte()

  const cameraSignal = signal(camera.current)
  $: cameraSignal.value = $camera

  const defaultProps = useDefaultProperties()
  const fontFamilies = useFontFamilies()
  const events: EventHandlers = {}

  let props: Properties = {}

  $: {
    props = {}
    for (const key of Object.keys($$restProps)) {
      if (eventPropNames.includes(key as keyof EventHandlers)) {
        events[key as keyof EventHandlers] = $$restProps[key]
        continue
      } else {
        props[key as keyof Properties] = $$restProps[key]
      }
    }
    if (active) props.active = active
    if (hover) props.hover = hover
  }

  export const ref = new Root(cameraSignal, renderer, undefined, defaultProps, fontFamilies)
  $: ref.setProperties(props)
  $: if (name) ref.name = name

  useTask(
    (delta) => {
      if (shouldRender()) {
        ref.update(delta)
      }
    },
    {
      autoInvalidate: false,
      stage: scheduler.createStage(Symbol('uikit-stage'), { before: renderStage }),
    }
  )
</script>

<Base
  is={ref}
  {events}
  active={active !== undefined}
  hover={hover !== undefined}
>
  <slot />
</Base>
