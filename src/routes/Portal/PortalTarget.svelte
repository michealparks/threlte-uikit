<script lang="ts">
  import { usePortal } from './usePortal.svelte'

  interface Props {
    id?: string
  }

  let { id = 'default' }: Props = $props()

  const { addPortal, removePortal } = usePortal()

  const snippets = addPortal(id)

  $effect.pre(() => {
    return () => removePortal(id)
  })
</script>

{#each snippets.value as snippet}
  {@render snippet()}
{/each}
