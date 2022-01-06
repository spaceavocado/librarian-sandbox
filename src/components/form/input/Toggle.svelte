<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let value: boolean
  export let name: string
  export let label = ''
  export let disabled = false

  $: checked = `${value}`

  const dispatch = createEventDispatcher()

  const toggle = () => !disabled && dispatch('changed', !value)
</script>

<style lang="scss">
  .toggle {
    $self: &;
    $width: $vs-3 * 1.5;

    &__content {
      position: relative;
      overflow: hidden;

      label {
        display: block;
        transition: color $at-1 $ac-1;
      }

      &__shell {
        $shell: &;
        width: $width;
        height: $vs-3;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        $offset: ($vs-3 - $vs-2) * 0.5;

        &:hover {
          #{ $shell }__carrige {
            &__outer {
              background: rgba($c-placeholder, 0.4);
              transform: scale(1);
            }
          }
        }

        &__bar {
          $height: $vs-2 * 0.75;
          height: $height;
          border-radius: $height * 0.5;
          width: $width - ($offset * 2);
          margin: ($vs-3 - $height) * 0.5 auto 0;
          background: $c-input-border;
        }

        &__carrige {
          position: absolute;
          left: 0;
          top: 0;
          transition: left $at-1 $ac-1;

          &__outer {
            transform: scale(0.5);
            background: rgba($c-placeholder, 0);
            transition: background $at-1 $ac-1, transform $at-1 $ac-1;
            border-radius: 50%;
            height: $vs-3;
            width: $vs-3;
            overflow: hidden;
          }

          &__inner {
            position: absolute;
            height: $vs-2;
            width: $vs-2;
            left: $offset;
            top: $offset;
            background: $c-bg-primary;
            transition: background $at-1 $ac-1;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
              rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
              rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
          }
        }
      }
    }

    &--checked {
      #{ $self }__content__shell__carrige {
        left: $width - $vs-3;
        &__inner {
          background: $c-primary;
        }
      }
    }

    &--disabled {
      &:hover {
        #{ $self }__content__shell__carrige {
          &__outer {
            transform: scale(0);
          }
        }
      }

      #{ $self }__content__shell {
        cursor: default;
        &__bar {
          background: $c-disabled;
        }

        &__carrige__inner {
          background: $c-disabled;
        }
      }
    }
  }
</style>

<div
  class="toggle"
  class:toggle--checked={value}
  class:toggle--disabled={disabled}
>
  <div class="toggle__content">
    {#if label}
      <label for={name}>{label}</label>
    {/if}
    <input type="hidden" value={checked} {name} />
    <div class="toggle__content__shell" on:click={toggle}>
      <div class="toggle__content__shell__bar" />
      <div class="toggle__content__shell__carrige">
        <div class="toggle__content__shell__carrige__outer" />
        <div class="toggle__content__shell__carrige__inner" />
      </div>
    </div>
  </div>
</div>
