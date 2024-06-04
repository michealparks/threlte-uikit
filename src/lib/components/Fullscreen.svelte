<script lang="ts">
	import Base from './Base.svelte'
	import type { EventHandlers, InheritableRootProperties } from '@pmndrs/uikit/internals'
	import { Fullscreen } from '@pmndrs/uikit'
	import { useThrelte, useTask } from '@threlte/core'
	import { useFontFamilies } from '../useFontFamilies'
	import { useDefaultProperties } from '../useDefaultProperties'

	type $$Props = {
		name?: string
		distanceToCamera?: number
	} & InheritableRootProperties &
		EventHandlers

	export let distanceToCamera: $$Props['distanceToCamera'] = undefined

	const { renderer, scheduler, renderStage, shouldRender } = useThrelte()
	const defaultProperties = useDefaultProperties()
	const fontFamilies = useFontFamilies()
	const is = new Fullscreen(
		renderer,
		distanceToCamera,
		$$restProps,
		defaultProperties,
		fontFamilies
	)

	useTask(
		(delta) => {
			if (shouldRender()) {
				is.update(delta)
			}
		},
		{
			autoInvalidate: false,
			stage: scheduler.createStage(Symbol('uikit-stage'), { before: renderStage }),
		}
	)
</script>

<Base
	{is}
	{...$$restProps}
>
	<slot />
</Base>
