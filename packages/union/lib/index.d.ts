export declare function mapLiteral<Union extends string | number, Result>(label: Union, cases: {
    [Label in Union]: (label: Label) => Result;
}): Result;
export declare namespace mapLiteral {
    var partial: <Union extends string | number, Result>(cases: { [Label in Union]: (label: Label) => Result; }) => (label: Union) => Result;
}
//# sourceMappingURL=index.d.ts.map