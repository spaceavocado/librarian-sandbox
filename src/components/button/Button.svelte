<script lang="ts" context="module">
  export enum Type {
    Primary = 'Primary',
    Danger = 'Danger',
  }

  export enum Modifier {
    None = '',
    Muted = 'Muted',
    Link = 'Link',
    Rounded = 'Rounded',
  }

  export enum Size {
    Small = 'Small',
    Normal = 'Normal',
    Large = 'Large',
  }

  export enum IconPlacement {
    Right = 'Right',
    Left = 'Left',
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { identity, toLower } from '../../common/fp'
  import SvgIcon from '../misc/SvgIcon.svelte'

  export let title = ''
  export let icon = ''
  export let type: Type = Type.Primary
  export let size: Size = Size.Normal
  export let modifier: Modifier[] | Modifier = Modifier.None
  export let iconPlacement: IconPlacement = IconPlacement.Left
  export let disabled = false

  $: cls =
    'button ' +
    [type, size, ...[modifier].flat(), icon ? `icon--${iconPlacement}` : '']
      .filter(identity)
      .map(toLower)
      .map((modifier) => `button--${modifier}`)
      .join(' ')

  const dispatch = createEventDispatcher()

  const click = () => !disabled && dispatch('click')
</script>

<style lang="scss">
  .button {
    $self: &;

    border-radius: $vs-1-quarter;
    background-color: $c-primary;
    color: contrast-color($c-primary, $c-text-inverted, $c-text-primary);
    padding: ($vs-2 - 2) $vs-2;
    cursor: pointer;
    line-height: 0;
    text-align: center;
    transition: background-color $at-1 $ac-1, color $at-1 $ac-1;
    &:hover {
      background-color: lighten($c-primary, 10%);
    }

    :global(.svg-icon) {
      max-height: $vs-1;
      max-width: $vs-1;
    }

    &--rounded {
      border-radius: 50%;
      max-width: $vs-2;
      max-height: $vs-2;
      padding: $vs-1-half;
      :global(.svg-icon) {
        margin: 0;
      }
    }

    &--danger {
      background-color: $c-danger;
      color: contrast-color($c-danger, $c-text-inverted, $c-text-primary);
      &:hover {
        background-color: lighten($c-danger, 10%);
      }
    }

    &--link {
      background-color: transparent;
      color: $c-primary;
      &:hover {
        background-color: transparent;
        color: contrast-color($c-primary, $c-primary, $c-text-primary);
      }
    }

    &--muted {
      background-color: transparent;
      color: $c-text-primary;
      &:hover {
        background-color: $c-primary;
        color: contrast-color($c-primary, $c-text-inverted, $c-text-primary);
      }
      &#{ $self }--danger {
        color: $c-danger;
        &:hover {
          background-color: $c-danger;
          color: contrast-color($c-danger, $c-text-inverted, $c-text-primary);
        }
      }
    }

    &--disabled {
      background-color: $c-disabled;
      color: $c-disabled-text;
      cursor: default;
      &:hover {
        background-color: $c-disabled;
        color: $c-disabled-text;
      }
    }

    &--small {
      padding: $vs-1-half;
    }

    &--icon--right {
      :global(.svg-icon) {
        padding-left: $vs-1-half;
        margin-right: 0;
      }
    }
  }
</style>

<div
  class={cls}
  class:button--disabled={disabled}
  role="button"
  {title}
  on:click|stopPropagation={click}
>
  {#if icon && iconPlacement === IconPlacement.Left}
    <SvgIcon {icon} />
  {/if}
  <slot />
  {#if icon && iconPlacement === IconPlacement.Right}
    <SvgIcon {icon} />
  {/if}
</div>
