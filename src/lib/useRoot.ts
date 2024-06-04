import { Fullscreen, Root } from '@pmndrs/uikit'
import { useTask, useThrelte, watch } from '@threlte/core'
import { signal } from '@preact/signals-core'
import { useDefaultProperties } from './useDefaultProperties'
import { useFontFamilies } from './useFontFamilies'

export const createRoot = (fullscreen = false) => {
	const { camera, renderer, shouldRender, scheduler, renderStage } = useThrelte()
	const defaultProperties = useDefaultProperties()
	const fontFamilies = useFontFamilies()

	const cameraSignal = signal(camera.current)
	const root = fullscreen
		? new Fullscreen(renderer, undefined, undefined, defaultProperties, fontFamilies)
		: new Root(cameraSignal, renderer, defaultProperties, undefined, fontFamilies)

	watch(camera, ($camera) => {
		cameraSignal.value = $camera
	})

	const stage = scheduler.createStage(Symbol('uikit-stage'), { before: renderStage })

	useTask(
		(delta) => {
			if (shouldRender()) {
				root.update(delta)
			}
		},
		{ autoInvalidate: false, stage }
	)

	return root
}
