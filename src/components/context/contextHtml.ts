import {
  ifElse,
  eq,
  constant,
  pipe,
  sort,
  reduce,
  unique,
  join,
  isUndefined,
  drop,
  tail,
  map,
  split,
} from '../../common/fp'
import type { EvaluationResult, Match } from '@spaceavocado/librarian'

const CSS_CLASS_MATCH = 'match'

const combinedLength = (a: Match, b: Match) => b.index - a.index + b.length
const combinedMatch = (a: Match, b: Match) =>
  ((trim) => a.match.substring(0, trim) + b.match)(b.index - a.index)

const combineMatches = (a: Match, b: Match): Match[] =>
  a.index < b.index + b.length
    ? [
        {
          ...b,
          length: combinedLength(b, a),
          match: combinedMatch(b, a),
          term: (b.term += `\xBC${a.term}`),
        },
      ]
    : [b, a]

const reduceMatches = (matches: Match[]) =>
  pipe(
    reduce<Match, Match[]>((reduced, match) =>
      isUndefined(reduced)
        ? [match]
        : (([rest, tail]: [Match[], Match]) => [
            ...rest,
            ...combineMatches(match, tail),
          ])([drop<Match>(1)(reduced), tail(reduced)])
    ),
    map((match) => ({
      ...match,
      term: pipe(split('\xBC'), unique, join(', '))(match.term),
    }))
  )(matches)

const placeMatches = (context: string) => (matches: Match[]) =>
  pipe(
    sort<Match>((a, b) => (a.index <= b.index ? -1 : 1)),
    reduceMatches,
    reduce(
      ({ offset, context }, match) =>
        ((replacement) => ({
          context:
            context.substring(0, match.index + offset) +
            replacement +
            context.substring(match.index + offset + match.length),
          offset: offset + replacement.length - match.length,
        }))(
          `<span class="${CSS_CLASS_MATCH}" data-term="${match.term}">${match.match}</span>`
        ),
      { offset: 0, context }
    ),
    ({ context }) => context
  )(matches)

export const contextHtml = (context: string) => (result: EvaluationResult) =>
  ifElse(eq(false), constant(context), placeMatches(context))(result)
