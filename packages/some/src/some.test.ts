import * as some from './some'

describe('map', () => {
  it('should map non null value', () => {
    const value = 'value' as string | null
    expect(some.map(value, s => s.length)).toBe(5)
  })

  it('should not map null value', () => {
    const value = null as string | null
    expect(some.map(value, s => s.length)).toBe(null)
  })
})
