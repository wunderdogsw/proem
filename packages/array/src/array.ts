export const map = <A, B>(mapfn: (a: A) => B, array: A[]): B[] => {
  const result: B[] = new Array(array.length)
  for (let i = 0; i < array.length; i++) {
    result[i] = mapfn(array[i])
  }
  return result
}

map.partial = <A, B>(mapFn: (a: A) => B) => (array: A[]): B[] =>
  map(mapFn, array)
