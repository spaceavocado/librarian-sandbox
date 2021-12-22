export const sort =
  <T>(fn: (a: T, b: T) => -1 | 0 | 1) =>
  (collection: T[]) =>
    collection.sort(fn)
