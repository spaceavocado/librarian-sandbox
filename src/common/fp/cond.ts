export const cond =
  <T, S>(pairs: [(value: T) => boolean, (value: T) => S][]) =>
  (value: T): S => {
    for (const [predicate, result] of pairs) {
      if (predicate(value)) {
        return result(value)
      }
    }
    return undefined
  }
