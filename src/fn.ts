/** `Guard` checks if a value is of a type. */
export type Guard<A, B extends A> = (value: A) => value is B

/** `Predicate` checks if something is true about a value. */
export type Predicate<A> = (value: A) => boolean

/** `UnaryFn` is a function that takes a single argument and returns a value. */
export type UnaryFn<A, B> = (value: A) => B

/** `BinaryFn` is a function that takes two arguments and returns a value. */
export type BinaryFn<A, B, C> = (a: A, b: B) => C

/** `Reducer` takes a state and a value and returns a new state. */
export type Reducer<A, B> = (accumulator: B, value: A) => B

/**
 * Transforms a function into a partially applied one.
 *
 * The transformed function takes the same arguments as the original function
 * except for the first one, and returns a function that only takes the original functions first argument.
 */
export function partial<A, B, Rest extends unknown[]>(
  fun: (a: A, ...rest: Rest) => B,
): (...rest: Rest) => (a: A) => B {
  return (...rest: Rest) => (a: A): B => {
    return fun(a, ...rest)
  }
}
