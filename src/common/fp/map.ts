import type { Functor } from './types'

export const map =
  <T, S>(fn: (item: T) => S) =>
  (functor: Functor<T>): S[] =>
    functor.map(fn)
