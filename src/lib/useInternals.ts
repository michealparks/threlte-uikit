import {
  initialize,
  unsubscribeSubscriptions,
  type Initializers,
  type Subscriptions,
} from '@pmndrs/uikit/internals'
import { onMount } from 'svelte'

interface Internals {
  initializers: Initializers
}

export const useInternals = (internals: Internals) => {
  const subscriptions: Subscriptions = []
  initialize(internals.initializers, subscriptions)
  onMount(() => {
    return () => unsubscribeSubscriptions(subscriptions)
  })
}
