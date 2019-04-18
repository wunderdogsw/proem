export interface Pipe<A, B> {
  (value: A): B

  to<C, Args extends unknown[]>(
    fn: (value: B, ...args: Args) => C,
    ...args: Args
  ): Pipe<A, C>
}

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
