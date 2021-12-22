<script lang="ts">
  import type { ProbeResult } from "@spaceavocado/librarian";
  import { probeHtml } from "./probeHtml";

  export let probe: ProbeResult

  $: html = probeHtml(probe)
</script>

<style lang="scss">
  .probe {
    $c-match: #19ce37;
    $c-miss: #ec5045;
    $c-skipped: #a5b1b4;

    h2 {
      @include font-size($fs-xs);
      padding-left: $vs-1-half;
    }

    :global(.evaluable) {
      display: inline-block;
      vertical-align: middle;
      padding: $vs-1-half;
      border-radius: $vs-1; 
    }

    :global(.evaluable--term) {
      padding: $vs-1-quarter $vs-1-half;
      margin: 0px $vs-1-quarter;
    }

    @for $i from 0 through 5 {
      :global(.result--match--#{$i}) {
        $color: lighten($c-match, $i * 10%);
        background-color: $color;
        color: contrast-color($color, $c-text-inverted, $c-text-primary);
      }
      :global(.result--miss--#{$i}) {
        $color: lighten($c-miss, $i * 10%);
        background-color: $color;
        color: contrast-color($color, $c-text-inverted, $c-text-primary);
      }
      :global(.result--skipped--#{$i}) {
        $color: lighten($c-skipped, $i * 10%);
        background-color: $color;
        color: contrast-color($color, $c-text-inverted, $c-text-primary);
      }
    }
  }
</style>

<div class="probe">
  <h2>Expression Probe</h2>
  {@html html}
</div>
