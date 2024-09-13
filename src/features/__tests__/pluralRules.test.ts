import { describe, expect, test } from 'vitest'
import { suggestionPlural } from '@/features/utility/pluralRules'

describe('"Предложения"', () => {
  test('1 предложение', () => {
    const num = 1
    const str = `${num} ${suggestionPlural.get(num)}`

    expect(str).toBe(`${num} предложение`)
  })

  test('2 предложения', () => {
    const num = 2
    const str = `${num} ${suggestionPlural.get(num)}`

    expect(str).toBe(`${num} предложения`)
  })

  test('3 предложения', () => {
    const num = 3
    const str = `${num} ${suggestionPlural.get(num)}`

    expect(str).toBe(`${num} предложения`)
  })

  test('8 предложений', () => {
    const num = 8
    const str = `${num} ${suggestionPlural.get(num)}`

    expect(str).toBe(`${num} предложений`)
  })

  test('245 предложений', () => {
    const num = 245
    const str = `${num} ${suggestionPlural.get(num)}`

    expect(str).toBe(`${num} предложений`)
  })
})
