<script lang="ts">
  import './scss/base.scss'
  import { parse, probe } from '@spaceavocado/librarian';
  import type { ProbeResult, EvaluationResult } from '@spaceavocado/librarian';
  import { pipe } from './common/fp'

  import Probe from './components/probe/Probe.svelte'
  import Expression from './components/expression/Expression.svelte'
  import Context from './components/context/Context.svelte'

  let context = ''
  let expression = ''

  let searchResult: EvaluationResult = false
  let probeResult: ProbeResult | undefined

  const search = () => {
    ([searchResult, probeResult] = probe(parse(expression)).evaluate(context))
  }
</script>

<main>
  <div class="container">
    <div class="row">
      <div class="col--xs--12">
        <div class="vs--xs--2" />
        <h1 class="heading--1">Librarian Sandbox</h1>
        <div class="vs--xs--2" />
        <div class="keyline--1" />
      </div>
    </div>
    <div class="row">
      <div class="vs--xs--2" />
      <div class="col--xs--12 flex">
        <Expression on:changed={pipe((e) => expression = e.detail, search)} />
      </div>
      <div class="vs--xs--2" />
      <div class="keyline--1" />
    </div>
    {#if probeResult}
      <div class="row">
        <div class="vs--xs--2" />
        <div class="col--xs--12">
          <Probe probe={probeResult} />
        </div>
        <div class="vs--xs--2" />
        <div class="keyline--1" />
      </div>
    {/if}
    <div class="row">
      <div class="vs--xs--2" />
      <div class="col--xs--12">
        <Context result={searchResult} on:changed={pipe((e) => context = e.detail, search)}/>
      </div>
      <div class="vs--xs--2" />
    </div>
  </div>
</main>
