export type Guard<A, B extends A> = (value: A) => value is B

export type Predicate<A> = (value: A) => boolean

export type UnaryFn<A, B> = (value: A) => B

export type BinaryFn<A, B, C> = (a: A, b: B) => C

export type Reducer<A, B> = (accumulator: B, value: A) => B

/**
 * Transforms a function into a partially applied one.
 * The transformed function takes the same arguments as the original function
 * except for the first one, and returns a function that only takes the originals first argument.
 */
export function partial<A, B, Rest extends any[]>(
  fun: (a: A, ...rest: Rest) => B,
): (...rest: Rest) => (a: A) => B {
  return (...rest: Rest) => (a: A): B => {
    return fun(a, ...rest)
  }
}
