<script lang="ts">
  import type { EvaluationResult } from '@spaceavocado/librarian'

  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import Button from '../button/Button.svelte'
  import Dialog from '../dialog/Dialog.svelte'
  import Text, { Type } from '../form/input/Text.svelte'
  import Tooltip from './Tooltip.svelte'
  import { contextHtml } from './contextHtml'

  export let result: EvaluationResult = false

  let contextDialogOpen = false
  let context = ''
  $: html = contextHtml(context)(result)

  let tooltipOpen = false
  let tooltip = ''
  let tooltipLeft = 0
  let tooltipTop = 0

  const dispatch = createEventDispatcher()

  const toggleContextDialog = () => {
    if (contextDialogOpen) {
      dispatch('changed', context)
    }
    contextDialogOpen = !contextDialogOpen
  }

  const showTooltip = (e: MouseEvent) => {
    if (e.target instanceof HTMLSpanElement) {
      tooltip = e.target.dataset.term
      tooltipOpen = true
      tooltipLeft = e.target.offsetLeft
      tooltipTop = e.target.offsetTop
      return
    }
    hideTooplip()
  }
  const hideTooplip = () => (tooltipOpen = false)

  const registerTooltips = () => {
    document
      .querySelector('.context__content')
      .addEventListener('mouseover', showTooltip)
    document
      .querySelector('.context__content')
      .addEventListener('mouseleave', hideTooplip)
  }

  const unregisterTooltips = () => {
    document
      .querySelector('.context__content')
      .removeEventListener('mouseover', showTooltip)
    document
      .querySelector('.context__content')
      .removeEventListener('mouseleave', hideTooplip)
  }

  onMount(async () => {
    registerTooltips()
    context =
      "“Saying 'I notice you're a nerd' is there like saying, 'Hey, I notice that you'd rather be intelligent than be stupid, that you'd rather be thoughtful than be vapid, that you believe that there are things that matter more than the arrest record of Lindsay Lohan. Why is that?' In fact, it seems to me that most contemporary insults are pretty lame. Even 'lame' is kind of lame. Saying 'You're lame' is like saying 'You walk with a limp.' Yeah, whatever, so does 50 Cent, and he's done all right for himself.”"
    dispatch('changed', context)
  })

  onDestroy(async () => {
    unregisterTooltips()
  })
</script>

<style lang="scss">
  .context {
    &__content {
      position: relative;
    }
    :global(.match) {
      display: inline-block;
      background-color: yellow;
    }
  }
</style>

<div class="context">
  <h2 class="heading--2">Search Context</h2>
  <div class="vs--xs--1" />
  <div class="context__content">
    {@html html}
    <Tooltip left={tooltipLeft} top={tooltipTop} on={tooltipOpen}
      >{tooltip}</Tooltip
    >
  </div>
  <div class="vs--xs--2" />
  <Button on:click={toggleContextDialog}>Change Context</Button>

  {#if contextDialogOpen}
    <Dialog
      title="Change Search Context"
      disabledEnterKey={true}
      on:ok={toggleContextDialog}
      on:cancel={toggleContextDialog}
    >
      <Text
        type={Type.MultiLine}
        value={context}
        name="context"
        on:changed={(e) => (context = e.detail)}
      />
    </Dialog>
  {/if}
</div>
