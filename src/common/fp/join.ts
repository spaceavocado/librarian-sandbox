export const join =
  <T extends { toString: () => string }>(separator: string) =>
  (collection: T[]) =>
    collection.join(separator)
