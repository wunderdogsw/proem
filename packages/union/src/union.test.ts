import * as union from './index'

type Label = 'a' | 'b' | 'c'

type Num = 1 | 2 | 3

describe('union', () => {
  describe(union.mapLiteral.name, () => {
    function labelToNumber(label: Label) {
      return union.mapLiteral(label, {
        a: () => 1,
        b: () => 2,
        c: () => 3,
      })
    }

    function numToLabel(num: 1 | 2 | 3) {
      return union.mapLiteral<Num, Label>(num, {
        1: () => 'a',
        2: () => 'b',
        3: () => 'c',
      })
    }

    it('should transform string value', () => {
      expect(labelToNumber('a')).toBe(1)
      expect(labelToNumber('b')).toBe(2)
      expect(labelToNumber('c')).toBe(3)
    })

    it('should transform number value', () => {
      expect(numToLabel(1)).toBe('a')
      expect(numToLabel(2)).toBe('b')
      expect(numToLabel(3)).toBe('c')
    })
  })

  describe(`${union.mapLiteral.name}.partial`, () => {
    const labelToNumber = union.mapLiteral.partial({
      a: () => 1,
      b: () => 2,
      c: () => 3,
    })

    const numToLabel = union.mapLiteral.partial<Num, Label>({
      1: () => 'a',
      2: () => 'b',
      3: () => 'c',
    })

    it('should transform string value', () => {
      expect(labelToNumber('a')).toBe(1)
      expect(labelToNumber('b')).toBe(2)
      expect(labelToNumber('c')).toBe(3)
    })

    it('should transform number value', () => {
      expect(numToLabel(1)).toBe('a')
      expect(numToLabel(2)).toBe('b')
      expect(numToLabel(3)).toBe('c')
    })
  })
})
