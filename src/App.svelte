<script lang="ts">
  import './scss/base.scss'
  import { parse, probe } from '@spaceavocado/librarian'
  import type { ProbeResult, EvaluationResult } from '@spaceavocado/librarian'
  import { pipe } from './common/fp'
  import { fade } from 'svelte/transition'

  import Probe from './components/probe/Probe.svelte'
  import Expression from './components/expression/Expression.svelte'
  import Context from './components/context/Context.svelte'
  import Snackbar, { Type } from './components/snackbar/Snackbar.svelte'

  let context = ''
  let expression = ''
  let exhaustiveOr = false

  let searchResult: EvaluationResult = false
  let probeResult: ProbeResult | undefined
  let notifications: {
    id: symbol
    type: Type
    message: string
  }[] = []

  const removeNotification = (id: symbol) => {
    notifications = notifications.filter(
      (notification) => notification.id !== id
    )
  }

  const search = () => {
    try {
      ;[searchResult, probeResult] = probe(
        parse(expression, { exhaustiveOr })
      ).execute(context)
    } catch (e) {
      const message: string = e.message ?? ''
      notifications = [
        ...notifications,
        {
          id: Symbol(),
          type: Type.Error,
          message: message[0].toUpperCase() + message.substring(1) + '.',
        },
      ]

      searchResult = false
      probeResult = undefined
    }
  }
</script>

<style lang="scss">
  main {
    .blurb {
      @include font-size($fs-xs);
    }
  }
  footer {
    @include font-size($fs-xs);
    opacity: 0.7;
  }
  .notifications {
    position: absolute;
    bottom: $vs-1;
    width: 100%;
    pointer-events: none;
    :global(.snackbar) {
      pointer-events: auto;
    }
    :global(.snackbar + .snackbar) {
      margin-top: $vs-1;
    }
  }
</style>

<main>
  <div class="container">
    <div class="row">
      <div class="col--xs--12">
        <div class="vs--xs--2" />
        <h1 class="heading--1">Librarian Sandbox</h1>
        <p class="blurb">
          <a href="https://github.com/spaceavocado/librarian" target="_blank"
            >Librarian</a
          >, a micro search library leveraging Boolean Operators, supporting
          Wildcard annotation within search terms.
        </p>
        <div class="vs--xs--2" />
        <div class="keyline--1" />
      </div>
    </div>
    <div class="row">
      <div class="vs--xs--2" />
      <div class="col--xs--12 flex">
        <Expression
          on:changed={pipe((e) => {
            expression = e.detail.input
            exhaustiveOr = e.detail.options.exhaustiveOr
            return expression
          }, search)}
        />
      </div>
      <div class="vs--xs--2" />
      <div class="keyline--1" />
    </div>
    {#if probeResult}
      <div class="row" in:fade={{ duration: 300 }}>
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
        <Context
          result={searchResult}
          on:changed={pipe((e) => (context = e.detail), search)}
        />
      </div>
      <div class="vs--xs--2" />
      <div class="keyline--1" />
    </div>
    <footer>
      <div class="vs--xs--2" />
      <a href="https://spaceavocado.com/" target="_blank">Space Avocado</a> | In
      search of greatness.
      <div class="vs--xs--2" />
    </footer>
  </div>
  <div class="notifications">
    {#each notifications as notification (notification.id)}
      <Snackbar
        type={notification.type}
        duration={5000}
        on:close={() => removeNotification(notification.id)}
        >{notification.message}</Snackbar
      >
    {/each}
  </div>
</main>
