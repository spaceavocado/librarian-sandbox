<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import Text from '../form/input/Text.svelte'
  import Button from '../button/Button.svelte'

  const dispatch = createEventDispatcher()

  let input = ''

  const search = () => dispatch('changed', input)

  const keypress = (e: KeyboardEvent) => e.key === 'Enter' && search()

  onMount(async () => {
    document
      .querySelector('.expression__input input')
      .addEventListener('keyup', keypress)
    input = '(("cen?" OR "penny" OR "beans") AND (NOT "s*ms" OR "*ame"))'
    search()
  })

  onDestroy(async () => {
    document
      .querySelector('.expression__input input')
      .removeEventListener('keyup', keypress)
  })
</script>

<style lang="scss">
  .expression {
    width: 100%;

    &__input {
      display: flex;

      :global(.input) {
        flex: auto;
      }

      :global(.button) {
        margin-left: $vs-1;
        align-self: flex-end;
      }
    }

    .legend {
      @include font-size($fs-xs);
      margin-top: $vs-1-half;
      width: 100%;
      display: flex;
      &__boolean,
      &__wildcards {
        width: 40%;

        &__title {
          font-style: oblique;
        }

        &__entry {
          padding-left: $vs-1;
          margin-top: $vs-1-half;

          span {
            background: rgba($c-text-primary, 0.05);
            border-radius: $vs-1-quarter;
            border: 1px solid rgba($c-text-primary, 0.1);
            padding: 0px $vs-1-quarter;
            display: inline-block;
          }
        }

        p {
          padding-left: $vs-1;
          margin-top: $vs-1-half;
        }
      }
      &__wildcards {
        width: 60%;
      }
    }
  }
</style>

<div class="expression">
  <div class="expression__input">
    <Text
      name="epxression"
      value={input}
      label="Search Expression (Master Librarian)"
      on:changed={(e) => (input = e.detail)}
    />
    <Button title="Search" on:click={search}>Search</Button>
  </div>
  <div class="legend">
    <div class="legend__boolean">
      <div class="legend__boolean__title">Boolean Operators</div>
      <div class="legend__boolean__entry">
        <div>
          <strong>AND</strong> Requires all terms to be found within the search context.
        </div>
        <div>Sample: <span>"nasa" AND "mission" AND "ganymede"</span>.</div>
      </div>
      <div class="legend__boolean__entry">
        <div>
          <strong>OR</strong> Requires at least one term to be found within the search
          context.
        </div>
        <div>Sample: <span>"nasa" OR "mission" OR "ganymede"</span>.</div>
      </div>
      <div class="legend__boolean__entry">
        <div>
          <strong>NOR</strong> Negative OR, Requires no terms to be found within
          the search context.
        </div>
        <div>Sample: <span>"nasa" NOR "mission" NOR "ganymede"</span>.</div>
      </div>
      <div class="legend__boolean__entry">
        <div>
          <strong>XOR</strong> Exclusive OR, requires exactly one term to be found
          within the search context.
        </div>
        <div>Sample: <span>"nasa" XOR "mission" XOR "ganymede"</span>.</div>
      </div>
      <div class="legend__boolean__entry">
        <div>
          <strong>NOT</strong> Flips the outcome of AND, OR, NOR, XOR operators and/or
          result of the search term.
        </div>
        <div>
          Sample: <span>NOT "spacex"</span>,
          <span>"nasa" AND NOT ("spacex" OR "galactic")</span>.
        </div>
      </div>
      <p>
        <a
          href="https://github.com/spaceavocado/librarian/blob/master/readme.md#boolean-operators"
          target="_blank">Full documentation</a
        >
      </p>
    </div>
    <div class="legend__wildcards">
      <div class="legend__wildcards__title">Wildcards</div>
      <div class="legend__wildcards__entry">
        <div>
          <strong>An Asterisk (*)</strong> An asterisk (*) may be used to specify
          any number of characters. It is typically used at the end of a root word,
          when it is referred to as "truncation." This is great when you want to
          search for variable endings of a root word.
        </div>
        <div>
          Sample: <span>cent*</span> (matches: cent<strong>er</strong>, cent<strong
            >re</strong
          >), <span>*fix</span> (matches: <strong>pre</strong>fix,
          <strong>suf</strong>fix), <span>b*r</span> (matches: b<strong
            >ee</strong
          >r, b<strong>ea</strong>r).
        </div>
      </div>
      <div class="legend__wildcards__entry">
        <div>
          <strong>A Question Mark (?)</strong> A question mark (?) may be used to
          represent a single character, anywhere in the word. It is most useful when
          there are variable spellings for a word, and you want to search for all
          variants at once.
        </div>
        <div>
          Sample: <span>cent??</span> (matches: cent<strong>er</strong>, cent<strong
            >re</strong
          >
          but NOT <s>cents</s>), <span>???fix</span> (matches:
          <strong>pre</strong>fix, <strong>suf</strong>fix but NOT
          <s>affix</s>), <span>b??r</span> (matches: b<strong>ee</strong>r, b<strong
            >ea</strong
          >r but NOT <s>bor</s>).
        </div>
      </div>
      <p>
        <a
          href="https://github.com/spaceavocado/librarian/blob/master/readme.md#wildcards"
          target="_blank">Full documentation</a
        >
      </p>
    </div>
  </div>
</div>
