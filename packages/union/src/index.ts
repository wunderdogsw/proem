export function mapLiteral<Union extends string | number, Result>(
  label: Union,
  cases: { [Label in Union]: (label: Label) => Result },
): Result {
  return cases[label](label)
}
