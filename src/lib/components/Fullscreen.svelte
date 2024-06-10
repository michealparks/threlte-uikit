<script lang="ts">
  import Base from './Shared/Base.svelte'
  import type { EventHandlers, InheritableRootProperties } from '@pmndrs/uikit/internals'
  import { Fullscreen } from '@pmndrs/uikit'
  import { useThrelte, useTask, watch } from '@threlte/core'
  import { useFontFamilies } from '../useFontFamilies'
  import { useDefaultProperties } from '../useDefaultProperties'
  import { eventPropNames } from './Shared/events'
  import type { Writable } from 'type-fest'

  type Properties = Writable<InheritableRootProperties>
  type $$Props = {
    name?: string
    distanceToCamera?: number
    ref?: Fullscreen
  } & Properties &
    EventHandlers

  export let name: string | undefined = undefined
  export let active: Properties['active'] = undefined
  export let hover: Properties['hover'] = undefined
  export let distanceToCamera: $$Props['distanceToCamera'] = undefined

  const { renderer, scheduler, renderStage, size, shouldRender } = useThrelte()

  const defaultProps = useDefaultProperties()
  const fontFamilies = useFontFamilies()
  const events: EventHandlers = {}

  let props: Properties = {}

  $: {
    props = {}
    for (const key of Object.keys($$restProps)) {
      if (eventPropNames.includes(key as keyof EventHandlers)) {
        events[key as keyof EventHandlers] = $$restProps[key]
      } else {
        props[key as keyof Properties] = $$restProps[key]
      }
    }
    if (active) props.active = active
    if (hover) props.hover = hover
  }

  export const ref = new Fullscreen(
    renderer,
    distanceToCamera,
    $$restProps,
    defaultProps,
    fontFamilies
  )
  $: ref.setProperties(props)
  $: if (name) ref.name = name

  watch(size, () => {
    // @TODO why on the next frame?
    requestAnimationFrame(() => ref.updateSize())
  })

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
