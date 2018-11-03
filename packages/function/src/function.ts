export type Guard<A, B extends A> = (value: A) => value is B

export type Predicate<A> = (value: A) => boolean

export type UnaryFn<A, B> = (value: A) => B

export type BinaryFn<A, B, C> = (a: A, b: B) => C
