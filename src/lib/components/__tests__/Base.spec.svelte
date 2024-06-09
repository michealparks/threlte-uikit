<script lang="ts">
  import { Container } from '@pmndrs/uikit'
  import Base from '../Shared/Base.svelte'
  import Root from '../Root.svelte'
</script>

<Root>
  <Base
    is={new Container()}
    name="base"
    {...$$restProps}
  />
</Root>
