/** `map` transforms a value with a function, or returns null if the value was null. */
export const map = <A, B>(value: A | null, mapper: (value: A) => B): B | null =>
  value === null ? null : mapper(value)
