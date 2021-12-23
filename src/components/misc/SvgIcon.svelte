<script lang="ts">
  import svgIcon from '../../misc/icon'

  export let icon: string
  $: svg = svgIcon(icon)
</script>

<style lang="scss">
  .svg-icon {
    fill: currentColor;
    line-height: 0;
    :global(svg) {
      width: 100%;
      height: 100%;
    }
  }
</style>

<div class="svg-icon">
  {@html svg}
</div>
