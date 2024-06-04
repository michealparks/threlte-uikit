<script lang="ts">
	import { CustomContainer } from '@pmndrs/uikit'
	import Base from './Base.svelte'
	import type { EventHandlers, InheritableCustomContainerProperties } from '@pmndrs/uikit/internals'
	import { useDefaultProperties } from '$lib/useDefaultProperties'

	type $$Props = { name?: string } & InheritableCustomContainerProperties & EventHandlers

	const defaultProperties = useDefaultProperties()
	const is = new CustomContainer($$restProps, defaultProperties)
</script>

<Base
	{is}
	{...$$restProps}
>
	<slot />
</Base>
