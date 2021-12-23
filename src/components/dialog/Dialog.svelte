<script lang="ts" context="module">
  export enum Type {
    Notice = 'Notice',
    Confirm = 'Confirm',
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'
  import { cond, eq } from '../../common/fp'
  import Button, { Size, Modifier } from '../button/Button.svelte'

  export let title: string
  export let labelOk = 'Ok'
  export let labelCancel = 'Cancel'
  export let type: Type = Type.Notice
  export let disabled = false
  export let disabledEnterKey = false

  const dispatch = createEventDispatcher()

  $: cls = `dialog ${type.toLowerCase()}`

  const ok = () => !disabled && dispatch('ok')
  const cancel = () => !disabled && dispatch('cancel')

  const keypress = (e: KeyboardEvent) =>
    !disabled &&
    cond([
      [eq('Enter'), () => !disabledEnterKey && ok()],
      [eq('Escape'), cancel],
    ])(e.key)

  const noop = () => undefined

  onMount(async () => {
    window.addEventListener('keydown', keypress)
  })

  onDestroy(async () => {
    window.removeEventListener('keydown', keypress)
  })
</script>

<style lang="scss">
  .dialog {
    $c-mask: rgba(rgb(0, 0, 0), 0.35);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: $c-mask;
    display: flex;
    align-items: center;
    justify-content: center;

    &__window {
      // max-width: 500px;
      @each $breakpoint, $width in $grid {
        @if $width > 0 and $breakpoint != xl {
          @include media-query($width, min) {
            width: $width - ($grid-margin * 2);
          }
        }
      }

      background: $c-bg-primary;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px,
        rgba(0, 0, 0, 0.14) 0px 24px 38px 3px,
        rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
      border-radius: $vs-1-quarter;
      margin: $vs-2;
      overflow-y: auto;

      &__header {
        padding: $vs-2 $vs-2 $vs-1;
        border-bottom: 1px solid $c-keyline-1;
        display: flex;
        span {
          font-weight: 700;
          flex: 1;
          padding-right: $vs-1;
        }
        :global(.button) {
          flex-shrink: 0;
        }
      }

      &__body {
        padding: $vs-1 $vs-2 $vs-2;
      }

      &__footer {
        padding: $vs-2;
        text-align: right;
        border-top: 1px solid $c-keyline-1;

        :global(.button) {
          display: inline-block;
        }
      }
    }
  }
</style>

<div
  class={cls}
  class:button-disabled={disabled}
  on:click|preventDefault={cancel}
  transition:fade={{ duration: 300 }}
>
  <div class="dialog__window" on:click|stopPropagation={noop}>
    <div class="dialog__window__header">
      <span>{title}</span>
      <Button
        icon="close"
        size={Size.Small}
        modifier={[Modifier.Muted, Modifier.Rounded]}
        {disabled}
        on:click={cancel}
      />
    </div>
    <div class="dialog__window__body">
      <slot />
    </div>
    <div class="dialog__window__footer">
      {#if type === Type.Confirm}
        <Button
          size={Size.Small}
          modifier={Modifier.Link}
          {disabled}
          on:click={cancel}>{labelCancel}</Button
        >
      {/if}
      <Button
        size={Size.Small}
        modifier={Modifier.Link}
        {disabled}
        on:click={ok}>{labelOk}</Button
      >
    </div>
  </div>
</div>
