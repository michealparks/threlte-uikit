<script lang="ts">
	import type { Texture } from 'three'
	import { Image } from '@pmndrs/uikit'
	import Base from './Base.svelte'
	import type { EventHandlers, InheritableImageProperties } from '@pmndrs/uikit/internals'
	import { useDefaultProperties } from '$lib/useDefaultProperties'

	type $$Props = {
		src?: string | Texture
		name?: string
	} & InheritableImageProperties &
		EventHandlers

	const defaultProperties = useDefaultProperties()
	const is = new Image($$restProps, defaultProperties)
</script>

<Base
	{is}
	{...$$restProps}
>
	<slot />
</Base>
