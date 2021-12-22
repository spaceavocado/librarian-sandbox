export const drop =
  <T>(count: number) =>
  (collection: T[]) =>
    collection.slice(0, collection.length - count)
