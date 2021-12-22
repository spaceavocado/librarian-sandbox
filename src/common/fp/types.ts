export interface Functor<T> {
  map<S>(fn: (value: T) => S): S[]
}

export interface Monoid<T> {
  reduce<S>(fn: (acc: S, cur: T) => S, zero?: S): S
}
