<script lang="ts">
	import { Text } from '@pmndrs/uikit'
	import Base from './Base.svelte'
	import { signal } from '@preact/signals-core'
	import type { EventHandlers, InheritableTextProperties } from '@pmndrs/uikit/internals'
	import { useDefaultProperties } from '$lib/useDefaultProperties'

	type $$Props = {
		text: string
		name?: string
	} & InheritableTextProperties &
		EventHandlers

	export let text: $$Props['text']

	const defaultProperties = useDefaultProperties()
	const textSignal = signal(text)
	const is = new Text(textSignal, $$restProps, defaultProperties)

	$: textSignal.value = text
</script>

<Base
	{is}
	{...$$restProps}
/>
