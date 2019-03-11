export function mapLiteral<Union extends string | number, Result>(
  label: Union,
  cases: { [Label in Union]: (label: Label) => Result },
): Result {
  return cases[label](label)
}

const mapLiteralPartial = <Union extends string | number, Result>(
  cases: { [Label in Union]: (label: Label) => Result },
) => (label: Union) => mapLiteral(label, cases)

mapLiteral.partial = mapLiteralPartial
