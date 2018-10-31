/*
  Package for handling possibly null values.
*/

export const map = <A, B>(value: A | null, mapper: (value: A) => B): B | null =>
  value === null ? null : mapper(value)

map.partial = <A, B>(mapper: (value: A) => B) => (value: A): B | null =>
  map(value, mapper)
