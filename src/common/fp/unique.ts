export const unique = <T>(collection: T[]): T[] =>
  collection.filter(
    (value, index, collection) => collection.indexOf(value) === index
  )
