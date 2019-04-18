/*
  Package for handling possibly null values.
*/

export const map = <A, B>(value: A | null, mapper: (value: A) => B): B | null =>
  value === null ? null : mapper(value)
