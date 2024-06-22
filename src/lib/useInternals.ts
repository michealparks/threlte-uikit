import { onMount } from 'svelte'
import type { Vector2Tuple, Mesh } from 'three'
import type { CurrentWritable } from '@threlte/core'
import { type ReadonlySignal, type Signal, untracked } from '@preact/signals-core'
import {
  initialize,
  unsubscribeSubscriptions,
  type Subscriptions,
  type Inset,
  createContainer,
  createImage,
  createRoot,
  createSvg,
  createText,
  // createIcon,
  // createCustomContainer,
  type ContainerProperties,
  type MergedProperties,
  type ImageProperties,
  type RootProperties,
  type SvgProperties,
  type TextProperties,
} from '@pmndrs/uikit/internals'

export type ComponentInternals<T = ContainerProperties> = {
  /**
   * the size of one pixel
   */
  pixelSize: ReadonlySignal<number>
  /**
   *  the outer width/height of the element
   */
  size: ReadonlySignal<Vector2Tuple | undefined>
  /**
   * the offset between from the element's center to its parent's center
   */
  center: ReadonlySignal<Vector2Tuple | undefined>
  /**
   * a tuple containing the border sizes on all 4 sides `[top, right, bottom, left]`
   */
  borderInset: ReadonlySignal<Inset | undefined>
  /**
   *  a tuple containing the padding sizes on all 4 sides `[top, right, bottom, left]`
   */
  paddingInset: ReadonlySignal<Inset | undefined>
  /**
   * the x/y scroll position of the children when the element is scrollable
   */
  scrollPosition?: Signal<Vector2Tuple | undefined>
  /**
   * the maximum x/y scroll position, based on the size of the children
   */
  maxScrollPosition?: ReadonlySignal<Partial<Vector2Tuple>>
  /**
   * the mesh added to the scene graph to capture events
   */
  interactionPanel: Mesh
  /**
   * exploses whether the element is fully clipped by some ancestor
   */
  isClipped?: ReadonlySignal<boolean>
  /**
   * set the styles of the element (the provided styles have a higher precedence then the element's properties)
   */
  setStyle(style: T | undefined): void
  /**
   * get the object last written to `setStyle`
   */
  getStyle(): Readonly<T> | undefined
  /**
   * read the current value for any property (combines default properties, direct properties, and styles)
   * @param key the name of the property
   */
  getComputedProperty<K extends keyof T>(key: K): T[K] | undefined
}

export type ContainerRef = ComponentInternals<ContainerProperties>
export type ImageRef = ComponentInternals<ImageProperties>
export type RootRef = ComponentInternals<RootProperties>
export type SvgRef = ComponentInternals<SvgProperties>
export type TextRef = ComponentInternals<TextProperties>
export type ContentRef = ContainerRef

type Internals = ReturnType<
  | typeof createContainer
  | typeof createImage
  | typeof createRoot
  | typeof createSvg
  | typeof createText
  // | typeof createIcon
  // | typeof createCustomContainer
> & {
  isClipped?: Signal<boolean>
  scrollPosition?: Signal<Vector2Tuple>
  mergedProperties: Signal<MergedProperties>
  interactionPanel: Mesh | CurrentWritable<Mesh>
}

export const useInternals = <T, Additional = object>(
  internals: Internals,
  styleSignal: Signal<T | undefined>,
  pixelSize: Signal<number>,
  additional?: Additional
): ComponentInternals<T> => {
  const subscriptions: Subscriptions = []
  initialize(internals.initializers, subscriptions)
  onMount(() => {
    return () => unsubscribeSubscriptions(subscriptions)
  })

  const {
    scrollPosition,
    paddingInset,
    borderInset,
    relativeCenter,
    size,
    maxScrollPosition,
    interactionPanel,
  } = internals

  return {
    setStyle: (style: T | undefined) => (styleSignal.value = style),
    getStyle: () => styleSignal.peek(),
    getComputedProperty: <K extends keyof T>(key: K) =>
      untracked(() =>
        internals.mergedProperties.value.read<T[K] | undefined>(key as string, undefined)
      ),
    pixelSize,
    borderInset,
    paddingInset,
    center: relativeCenter,
    maxScrollPosition,
    size,
    get interactionPanel() {
      return 'isMesh' in interactionPanel ? interactionPanel : interactionPanel.current
    },
    scrollPosition,
    isClipped: internals.isClipped,
    ...additional,
  }
}
