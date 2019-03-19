export interface Pipe<A, B> {
    (value: A): B;
    to<C, Args extends any[]>(fn: (value: B, ...args: Args) => C, ...args: Args): Pipe<A, C>;
}
export declare const pipe: <A, B, Rest extends any[]>(fn: (a: A, ...rest: Rest) => B, ...rest: Rest) => Pipe<A, B>;
//# sourceMappingURL=index.d.ts.map