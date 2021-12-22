export const ifElse =
  <T, S, U>(
    predicate: (value: T) => boolean,
    success: (arg: T) => S,
    fail: (arg: T) => U
  ) =>
  (arg: T) =>
    predicate(arg) ? success(arg) : fail(arg)
