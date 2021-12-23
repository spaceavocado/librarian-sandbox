<script lang="ts" context="module">
  export enum Type {
    Info = 'Info',
    Success = 'Success',
    Warning = 'Warning',
    Error = 'Error',
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { onMount, onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'
  import popin from '../../transitions/popin'

  import Button, { Size, Modifier } from '../button/Button.svelte'

  export let type: Type = Type.Info
  export let duration: number = 0

  const dispatch = createEventDispatcher()
  $: cls = `snackbar snackbar--${type.toLowerCase()}`
  let timer = null

  const close = () => dispatch('close')

  onMount(() => {
    if (duration) {
      timer = setTimeout(close, duration)
    }
  })

  onDestroy(() => {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
  })
</script>

<style lang="scss">
  .snackbar {
    margin: 0 auto;
    max-width: 400px;
    border-radius: 4px;
    padding: $vs-1;
    display: flex;
    p {
      flex-grow: 1;
      padding: $vs-1-half $vs-1 0 $vs-1-half;
    }
    :global(.button) {
      height: $vs-1;
      width: $vs-1;
      flex-shrink: 0;
    }

    &--info {
      background-color: $c-info;
      color: $c-info-text;
      :global(.button) {
        background-color: $c-info;
        color: $c-info-text;
        &:hover {
          background-color: darken($c-info, 10%);
        }
      }
    }

    &--success {
      background-color: $c-success;
      color: $c-success-text;
      :global(.button) {
        background-color: $c-success;
        color: $c-success-text;
        &:hover {
          background-color: darken($c-success, 10%);
        }
      }
    }

    &--warning {
      background-color: $c-warning;
      color: $c-warning-text;
      :global(.button) {
        background-color: $c-warning;
        color: $c-warning-text;
        &:hover {
          background-color: darken($c-warning, 10%);
        }
      }
    }

    &--error {
      background-color: $c-danger;
      color: $c-danger-text;
      :global(.button) {
        background-color: $c-danger;
        color: $c-danger-text;
        &:hover {
          background-color: darken($c-danger, 10%);
        }
      }
    }
  }
</style>

<div class={cls} in:popin out:fade={{ duration: 300 }}>
  <p>
    <slot />
  </p>
  <Button
    icon="close"
    size={Size.Small}
    modifier={[Modifier.Muted, Modifier.Rounded]}
    on:click={close}
  />
</div>
