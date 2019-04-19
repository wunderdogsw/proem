/** `Pipe` is a function that can be composed with another function. */
export interface Pipe<A, B> {
  (value: A): B

  /**
   * `to` takes a function and it's arguments after the first one. It returns
   * a Pipe that transforms a value using the original pipe and the function as the last step.
   */
  to<C, Args extends unknown[]>(
    fn: (value: B, ...args: Args) => C,
    ...args: Args
  ): Pipe<A, C>
}

/** `pipe` returns a composable pipeline function that takes a single argument. */
export const pipe = <A, B, Rest extends unknown[]>(
  fn: (a: A, ...rest: Rest) => B,
  ...rest: Rest
): Pipe<A, B> => {
  const piped = (a: A): B => fn(a, ...rest)
  piped.to = <C, Args extends unknown[]>(
    nextFn: (value: B, ...args: Args) => C,
    ...args: Args
  ) => {
    const result = (a: A): C => nextFn(piped(a), ...args)
    return pipe(result)
  }
  return piped
}
