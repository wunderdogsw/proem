export declare type Guard<A, B extends A> = (value: A) => value is B;
export declare type Predicate<A> = (value: A) => boolean;
export declare type UnaryFn<A, B> = (value: A) => B;
export declare type BinaryFn<A, B, C> = (a: A, b: B) => C;
export declare type Reducer<A, B> = (accumulator: B, value: A) => B;
//# sourceMappingURL=index.d.ts.map