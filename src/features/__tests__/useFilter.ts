import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { renderHook, RenderHookResult } from '@testing-library/react'
import { Filter, useFilter } from '@/features/useFilter'
import { convertToBase64 } from '@/features/utility/convertBase64'

function TestComponent() {
  return useFilter()
}

function AnotherTestComponent() {
  return useFilter()
}

class TestFilters {
  private readonly _hookResult: RenderHookResult<ReturnType<typeof TestComponent>, unknown>

  get hookResult() {
    return this._hookResult.result.current
  }

  constructor() {
    this._hookResult = renderHook(TestComponent)
  }

  public addFilter(filter: Filter) {
    this.hookResult.addFilter(filter.id, filter.value)
    this._hookResult.rerender()
  }

  public addFiltersList(list: Filter[]) {
    list.forEach((filter) => {
      this.hookResult.addFilter(filter.id, filter.value)
      this._hookResult.rerender()
    })
  }

  public changeFilter(filter: Filter, value: Filter['value']) {
    this.hookResult.addFilter(filter.id, value)
    this._hookResult.rerender()
  }

  public string() {
    return this.hookResult.filter.str
  }

  public parsed() {
    return this.hookResult.filter.parsed
  }

  public removeFilter(filter: Filter) {
    this.hookResult.removeFilter(filter.id)
    this._hookResult.rerender()
  }

  public clearFilters() {
    this.hookResult.clearFilters()
    this._hookResult.rerender()
  }
}

describe('useFilter', () => {
  beforeAll(() => {
    vi.mock('next/navigation', () => {
      const useSearchParams = function () {
        return {
          get(key: string) {
            const searchParams = new URLSearchParams(window.location.search)
            return searchParams.get(key)
          },
          toString() {
            return window.location.search
          },
        }
      }

      return { useSearchParams }
    })
  })

  beforeEach(() => {
    window.history.replaceState(null, '', `?`)
  })

  describe('Base functional', () => {
    test('Should render hook', () => {
      const testFilters = new TestFilters()

      expect(testFilters.string()).toBeNull
    })

    test('Should add one filter in search params', () => {
      const testFilters = new TestFilters()

      const filter = { id: 1, value: [1, 2] }
      testFilters.addFilter(filter)

      expect.soft(testFilters.string()).toStrictEqual(convertToBase64([filter]))
      expect.soft(testFilters.parsed()).toStrictEqual([filter])
    })

    test('Should add one filter in search params, then replace value', () => {
      const testFilters = new TestFilters()

      const filter = { id: 1, value: [1, 2] }

      testFilters.addFilter(filter)

      expect.soft(testFilters.string()).toStrictEqual(convertToBase64([filter]))
      expect.soft(testFilters.parsed()).toStrictEqual([filter])

      filter.value = [3, 4]
      testFilters.changeFilter(filter, filter.value)

      expect.soft(testFilters.string()).toStrictEqual(convertToBase64([filter]))
      expect.soft(testFilters.parsed()).toStrictEqual([filter])
    })

    test('Should add two filters in search params', () => {
      const testFilters = new TestFilters()

      const filters = [
        { id: 1, value: [1, 2] },
        { id: 2, value: [3, 4] },
      ]

      testFilters.addFilter(filters[0])
      expect.soft(testFilters.string()).toStrictEqual(convertToBase64([filters[0]]))
      expect.soft(testFilters.parsed()).toStrictEqual([filters[0]])

      testFilters.addFilter(filters[1])
      expect.soft(testFilters.string()).toStrictEqual(convertToBase64(filters))
      expect.soft(testFilters.parsed()).toStrictEqual(filters)
    })

    test('Should add two filters in search params, then remove one', () => {
      const testFilters = new TestFilters()

      const filters = [
        { id: 1, value: [1, 2] },
        { id: 2, value: [3, 4] },
      ]

      testFilters.addFilter(filters[0])
      expect.soft(testFilters.string()).toStrictEqual(convertToBase64([filters[0]]))
      expect.soft(testFilters.parsed()).toStrictEqual([filters[0]])

      testFilters.addFilter(filters[1])
      expect.soft(testFilters.string()).toStrictEqual(convertToBase64(filters))
      expect.soft(testFilters.parsed()).toStrictEqual(filters)

      testFilters.removeFilter(filters[0])
      expect.soft(testFilters.string()).toStrictEqual(convertToBase64([filters[1]]))
      expect.soft(testFilters.parsed()).toStrictEqual([filters[1]])
    })

    test('Should add two filters, then clear them', () => {
      const testFilters = new TestFilters()

      const filters = [
        { id: 1, value: [1, 2] },
        { id: 2, value: [3, 4] },
      ]

      testFilters.addFilter(filters[0])
      expect.soft(testFilters.string()).toStrictEqual(convertToBase64([filters[0]]))
      expect.soft(testFilters.parsed()).toStrictEqual([filters[0]])

      testFilters.addFilter(filters[1])
      expect.soft(testFilters.string()).toStrictEqual(convertToBase64(filters))
      expect.soft(testFilters.parsed()).toStrictEqual(filters)

      testFilters.clearFilters()
      expect.soft(testFilters.string()).toBeNull
      expect.soft(testFilters.parsed()).toStrictEqual([])
    })

    test('Should add two filters, then find them', () => {
      const testFilters = new TestFilters()

      const filters = [
        { id: 1, value: [1, 2] },
        { id: 2, value: [3, 4] },
      ]

      testFilters.addFilter(filters[0])
      expect.soft(testFilters.string()).toStrictEqual(convertToBase64([filters[0]]))
      expect.soft(testFilters.parsed()).toStrictEqual([filters[0]])

      testFilters.addFilter(filters[1])
      expect.soft(testFilters.string()).toStrictEqual(convertToBase64(filters))
      expect.soft(testFilters.parsed()).toStrictEqual(filters)

      expect.soft(testFilters.hookResult.findFilter(filters[0].id)).toStrictEqual(filters[0])
      expect.soft(testFilters.hookResult.findFilter(filters[1].id)).toStrictEqual(filters[1])
    })

    test('Should load two filters from url on mount', () => {
      const filters = [
        { id: 1, value: [1, 2] },
        { id: 2, value: [3, 4] },
      ]
      const base64 = convertToBase64(filters)

      window.history.replaceState(null, '', `?filter=${base64}`)

      const testFilters = new TestFilters()

      expect(testFilters.string()).toBe(base64)
      expect(testFilters.parsed()).toStrictEqual(filters)
    })
  })

  describe('Advanced tests', () => {
    const filters: Map<number, Filter> = new Map([
      [1, { id: 1, value: [1, 2] }],
      [2, { id: 2, value: [3, 5] }],
      [3, { id: 3, value: ['some', 'value'] }],
      [4, { id: 4, value: ['value'] }],
      [5, { id: 5, value: ['value', 'value2', 'value3', 'value4'] }],
      [6, { id: 6, value: false }],
      [7, { id: 7, value: true }],
      [8, { id: 8, value: ['value2', 4, 5, 6, 7, 9, 10] }],
      [9, { id: 9, value: true }],
      [10, { id: 10, value: ['value2'] }],
      [11, { id: 11, value: true }],
      [12, { id: 12, value: true }],
      [13, { id: 13, value: ['value'] }],
      [14, { id: 14, value: true }],
      [15, { id: 15, value: true }],
      [16, { id: 16, value: ['value', 'value2', 2, 'value4'] }],
      [17, { id: 17, value: true }],
      [18, { id: 18, value: [4, 6] }],
      [19, { id: 19, value: true }],
      [20, { id: 20, value: true }],
      [21, { id: 21, value: [1, 500000] }],
      [22, { id: 22, value: true }],
      [23, { id: 23, value: [50000, 900000] }],
      [24, { id: 24, value: true }],
      [25, { id: 25, value: false }],
      [26, { id: 26, value: true }],
      [27, { id: 27, value: false }],
      [28, { id: 28, value: [1, 2, 3, 4, 5, 6] }],
      [29, { id: 29, value: true }],
      [30, { id: 30, value: ['value'] }],
    ])

    test('Should add 30 filters', () => {
      const testFilters = new TestFilters()
      const array = Array.from(filters.values())
      testFilters.addFiltersList(Array.from(array))

      expect.soft(testFilters.string()).toBe(convertToBase64(array))
      expect(testFilters.parsed()).toStrictEqual(array)
    })

    test('Should add 30 filters, then change value of 3, remove 5 items and add 1 new value', () => {
      const testFilters = new TestFilters()
      testFilters.addFiltersList(Array.from(filters.values()))

      const copyFilters = new Map(filters)
      copyFilters.get(6)!.value = [11, 432423]
      copyFilters.get(7)!.value = [11, 'dasdsad']
      copyFilters.get(8)!.value = ['1']
      testFilters.changeFilter(copyFilters.get(6)!, copyFilters.get(6)!.value)
      testFilters.changeFilter(copyFilters.get(7)!, copyFilters.get(7)!.value)
      testFilters.changeFilter(copyFilters.get(8)!, copyFilters.get(8)!.value)

      testFilters.removeFilter(copyFilters.get(9)!)
      testFilters.removeFilter(copyFilters.get(10)!)
      testFilters.removeFilter(copyFilters.get(11)!)
      testFilters.removeFilter(copyFilters.get(12)!)
      testFilters.removeFilter(copyFilters.get(13)!)

      copyFilters.delete(9)
      copyFilters.delete(10)
      copyFilters.delete(11)
      copyFilters.delete(12)
      copyFilters.delete(13)

      const newValue = { id: 31, value: [1, 999] }
      copyFilters.set(newValue.id, newValue)
      testFilters.addFilter(newValue)

      const array = Array.from(copyFilters.values())
      expect.soft(testFilters.string()).toBe(convertToBase64(array))
      expect(testFilters.parsed()).toStrictEqual(array)
    })

    test('Should add 1 filter in first component and get from another', () => {
      const testFilters = new TestFilters()
      const anotherComponent = renderHook(AnotherTestComponent)

      const filter = { id: 1, value: [1, 2] }
      testFilters.addFilter(filter)

      anotherComponent.rerender()

      expect.soft(anotherComponent.result.current.filter.str).toBe(convertToBase64([filter]))
      expect(anotherComponent.result.current.filter.parsed).toStrictEqual([filter])
    })

    test('Not should overwrite another search params', () => {
      window.history.replaceState(null, '', '?some=var')

      const testFilters = new TestFilters()
      const filter = { id: 1, value: [1, 2] }
      testFilters.addFilter(filter)

      expect(window.location.search).toBe(`?some=var&filter=${convertToBase64([filter])}`)
    })
  })
})
