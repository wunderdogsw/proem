export interface Pipe<A, B> {
  (value: A): B

  to<C, Args extends any[]>(
    fn: (value: B, ...args: Args) => C,
    ...args: Args
  ): Pipe<A, C>
}

export const pipe = <A, B, Rest extends any[]>(
  fn: (a: A, ...rest: Rest) => B,
  ...rest: Rest
): Pipe<A, B> => {
  const piped = (a: A) => fn(a, ...rest)
  piped.to = <C, Args extends any[]>(
    fn: (value: B, ...args: Args) => C,
    ...args: Args
  ) => {
    const result = (a: A) => fn(piped(a), ...args)
    return pipe(result)
  }
  return piped
}
