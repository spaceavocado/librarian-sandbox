<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import Text from '../form/input/Text.svelte'
  import Button from '../button/Button.svelte'
  import { pipe } from '../../common/fp';

  const dispatch = createEventDispatcher()

  // let input = '(("santa" OR "house") AND (NOT "missing" OR "sky??"))'
  let input = ''

  const search = () => dispatch('changed', input)

  onMount(async () => {
    // input = '"San" AND "nta"'
    input = '(("santa" OR "house") AND (NOT "missing" OR "sky??"))'
    search()
  })
</script>

<style lang="scss">
  .expression {
    display: flex;
    width: 100%;

    :global(.input) {
      flex: auto;
    }

    :global(.button) {
      margin-left: $vs-1;
      align-self: flex-end;
    }
  }
</style>

<div class="expression">
  <Text
    name="epxression"
    value={input}
    label="Search Expression (Master Librarian)"
    on:changed={pipe((e) => (input = e.detail), search)}
  />
  <Button title="Search" on:click={search}>Search</Button>
</div>
