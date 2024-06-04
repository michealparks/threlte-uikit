<script lang="ts">
	import { Svg } from '@pmndrs/uikit'
	import Base from './Base.svelte'
	import type { EventHandlers, InheritableContainerProperties } from '@pmndrs/uikit/internals'
	import { useDefaultProperties } from '$lib/useDefaultProperties'

	type $$Props = { name?: string } & InheritableContainerProperties & EventHandlers

	const defaultProperties = useDefaultProperties()
	const is = new Svg($$restProps, defaultProperties)
</script>

<Base
	{is}
	{...$$restProps}
>
	<slot />
</Base>
