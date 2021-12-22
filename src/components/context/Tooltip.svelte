<script lang="ts">
  import { fade } from 'svelte/transition'

  export let on = false
  export let top = 0
  export let left = 0
</script>

<style lang="scss">
  .tooltip {
    $c-tooltip: rgba($c-text-primary, .7);

    padding: $vs-1-half $vs-1 * 0.75;
    background: $c-tooltip;
    color: $c-text-inverted;
    @include font-size($fs-xs);
    border-radius: $vs-1-half;
    position: absolute;
    z-index: 10;
    top: -($vs-1-half);
    transform: translateY(-100%);
  }
</style>

{#if on}
  <div class="tooltip" transition:fade="{{duration: 100}}" style="left: {left}px; top: {top}px">
    <slot/>
  </div> 
{/if}