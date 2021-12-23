<script lang="ts">
  import type { ProbeResult } from '@spaceavocado/librarian'
  import { probeHtml } from './probeHtml'

  export let probe: ProbeResult

  $: html = probeHtml(probe)
</script>

<style lang="scss">
  .probe {
    $c-match: #0bd315;
    $c-miss: #f34336;
    $c-skipped: #b9e1e7;

    h2 {
      @include font-size($fs-xs);
      padding-left: $vs-1-half;
      margin-bottom: $vs-1-quarter;
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

    $c1: $c-match;
    $c2: $c-miss;
    $c3: $c-skipped;
    @for $i from 0 through 5 {
      $c1: mix(white, $c1, $i * 10%);
      $c2: mix(white, $c2, $i * 10%);
      $c3: mix(white, $c3, $i * 10%);
      :global(.result--match--#{$i}) {
        $color: $c1;
        background-color: $color;
        color: contrast-color($color, $c-text-inverted, $c-text-primary);
      }
      :global(.result--miss--#{$i}) {
        $color: $c2;
        background-color: $color;
        color: contrast-color($color, $c-text-inverted, $c-text-primary);
      }
      :global(.result--skipped--#{$i}) {
        $color: $c3;
        background-color: $color;
        color: contrast-color($color, $c-text-inverted, $c-text-primary);
      }
    }

    .legend {
      @include font-size($fs-xs);
      padding-left: $vs-1-half;
      margin-top: $vs-1-half;

      div {
        display: inline-block;

        span {
          display: inline-block;
          border-radius: 50%;
          width: $vs-1;
          height: $vs-1;
          margin-right: $vs-1-half;
          vertical-align: text-top;
        }
      }
      div + div {
        margin-left: $vs-1;
      }
      &__match span {
        background-color: $c-match;
      }
      &__miss span {
        background-color: $c-miss;
      }
      &__skipped span {
        background-color: $c-skipped;
      }
    }
  }
</style>

<div class="probe">
  <h2>Expression Probe</h2>
  {@html html}
  <div class="legend">
    <div class="legend__match"><span />Postive Match</div>
    <div class="legend__miss"><span />Negative Match</div>
    <div class="legend__skipped"><span />Eliminated Branch</div>
  </div>
</div>
