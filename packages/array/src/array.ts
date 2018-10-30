export const map = <A, B>(array: A[], mapfn: (a: A) => B): B[] => {
  const result: B[] = new Array(array.length)
  for (let i = 0; i < array.length; i++) {
    result[i] = mapfn(array[i])
  }
  return result
}

map.partial = <A, B>(mapFn: (a: A) => B) => (array: A[]): B[] =>
  map(array, mapFn)
