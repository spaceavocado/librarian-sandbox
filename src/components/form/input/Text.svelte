<script lang="ts" context="module">
  export enum Type {
    SingleLine = 'SingleLine',
    MultiLine = 'MultiLine',
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  
  export let value: string
  export let name: string
  export let label = ''
  export let placeholder = ''
  export let type: Type = Type.SingleLine
  export let disabled = false

  let active = false
  const dispatch = createEventDispatcher()

  const focus = () => {
    active = true
  }
  const blur = () => {
    active = false
  }
  const input = () => dispatch('input', value)
  const changed = () => dispatch('changed', value)
</script>

<style lang="scss">
  .input {
    $self: &;

    &__content {
      position: relative;
      overflow: hidden;

      label {
        display: block;
        margin-bottom: $vs-1-half;
        transition: color $at-1 $ac-1;
      }

      input,
      textarea {
        padding: $vs-1;
        width: 100%;
        box-sizing: border-box;
        outline: none;
        border: 1px solid $c-input-border;
        background-color: $c-input-bg;
        color: $c-text-primary;
        &::placeholder {
          opacity: 0.7;
        }
      }
      textarea {
        vertical-align: top;
      }
      hr {
        border-bottom: 2px solid $c-primary;
        bottom: 0px;
        box-sizing: content-box;
        margin: 0px;
        position: absolute;
        width: 100%;
        transform: scaleY(0);
        transition: transform $at-1 $ac-1;
      }
    }

    &--active {
      #{ $self }__content {
        label {
          color: $c-primary;
        }
        hr {
          transform: scaleY(1);
        }
        input {
          border-bottom: 1px solid $c-primary;
        }
      }
    }
    &--disabled {
      #{ $self }__content {
        input,
        textarea {
          background: $c-disabled;
          color: $c-disabled-text;
        }
      }
    }
  }
</style>

<div class="input" class:input--active={active} class:input--disabled={disabled}>
  <div class="input__content">
    {#if label}
      <label for="{name}">{label}</label>
    {/if}
    {#if type == Type.MultiLine}
      <textarea bind:value="{value}" rows="5" name="{name}" placeholder="{placeholder}" disabled="{disabled}" on:focus="{focus}" on:blur="{blur}" on:input="{input}" on:change="{changed}" />
    {:else}
      <input bind:value="{value}" type="text" name="{name}" placeholder="{placeholder}" disabled="{disabled}" on:focus="{focus}" on:blur="{blur}" on:input="{input}" on:change="{changed}" />
    {/if}
    <hr aria-hidden="true" />
  </div>
</div>