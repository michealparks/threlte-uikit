<script lang="ts">
  import { usePortal } from './usePortal.svelte'
  import type { Snippet } from 'svelte'

  interface Props {
    id?: string
    children: Snippet
  }

  let { id = 'default', children }: Props = $props()

  const { addSnippet, removeSnippet } = usePortal()

  $effect.pre(() => {
    addSnippet(id, children)
    return () => removeSnippet(id, children)
  })
</script>
