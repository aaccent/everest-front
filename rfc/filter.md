# Описание реализации фильтрации

Описание управления фильтрами категории через GET параметры

## Проблема

На странице любой категории имеется структура:

```jsx
// Лишние элементы опущены
<FilterPopup />
<CategoryLayout>
  <QuickFilter />
  <CatalogContent />
</CategoryLayout>
```

`FilterPopup` и `QuickFilter` находятся в разных местах, поэтому мы не можем соединить их через контекст.
В любом случае приходится реализовывать возможность сохранять фильтр в ссылке,
поэтому фильтры хранятся в GET параметрах, а не в контексте.

## Хук фильтрации

Управление GET параметром происходит через кастомный хук `useCategoryFilter()`.
Состояние текущего фильтра хранится в `filter`. Состояние необходимо чтобы компонент не пересовывался лишний раз из-за
смены `searchParams`.

Когда пользователь меняет фильтр в попапе `FilterPopup` или блоке `QuickFilter`,
то через `addFilter()` они добавляются в GET параметр `filter`.

При изменении GET параметров:

1. Значение сохраняется в переменную с помощью `getFilterSearchParams()`
2. Сравнивается с `filter.str`
3. Если строки равны, то состояние не меняется
4. Если разные, то строка парсится с помощью `parseSearchParamsToFilter()` и записывается в состояние

**Описание хука:**

```tsx
'use client'
import React, { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'

interface Filter {
  name: string
  type: 'multilist' | 'inline-multilist' | 'range' | 'toggle'
}

/** Функциональность для управления фильтрацией категории в GET параметрах ссылки. */
function useCategoryFilter() {
  const searchParams = useSearchParams()
  const [filter, setFilter] = useState({
    str: getFilterSearchParams(),
    parsed: parseSearchParamsToFilter(),
  })

  function getFilterSearchParams(): string {}

  /**
   * Читает из GET параметров ссылки значение фильтра и парсит в [Filter[]]{@link Filter}.
   * @return `Filter[]` если значение установлено, иначе пустой массив.
   */
  const parseSearchParamsToFilter = useCallback((): Filter[] => {})

  useEffect(() => {
    setFilter((current) => {
      const filterSearchParams = getFilterSearchParams()

      // Проверка необходима чтобы убрать лишние перерисовки.
      // Если вернуть предыдущее состояние-объект, то перерисовка не случится.
      // Если бы возвращался всегда новый объект, то компонент перерисовывался
      // даже если бы значения в объектах были одинаковые.
      // Подрбнее: https://react.dev/learn/updating-objects-in-state
      if (current.str === filterSearchParams) return current

      return {
        str: filterSearchParams,
        parsed: parseSearchParamsToFilter(filterSearchParams),
      }
    })
  }, [searchParams])

  /**
   * Добавляет в GET параметры ссылки новое значение `value` фильтра по `id`.
   * Если значение уже существует, то заменяет его новым.
   * @param id - идентификатора фильтра
   * @param value - значение фильтра
   */
  function addFilter(id: number, value: string[] | string): void {}

  return { filter, getFilterFromUrl, addFilter }
}
```

## Хук сортировки

Выбранная пользователем сортировка хранится в GET параметрах для сохранения состояния между загрузками.
Управление значением происходит с помощью кастомного хука `useCategorySort()`

**Описание хука:**

```tsx
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

/** Фунциональность для управления сортировкой категории в GET параметрах ссылки */
function useCategorySort() {
  const searchParams = useSearchParams()
  const [sort, setSort] = useState<string | null>(getSortFromUrl())

  /**
   * Получить установленное в GET параметрах ссылки значение сортировки.
   * @return Если значение установлено, то `string`, иначе `null`.
   * */
  function getSortFromUrl(): string | null {}

  useEffect(() => {
    setSort(getSortFromUrl())
  }, [searchParams])

  /**
   * Устанавливает сортировку `value` в GET параметры ссылки.
   * Если передано `null`, то GET параметр убирается.
   * @param value - `string` для установки значения и `null` чтобы убрать значение
   * */
  function setSort(value: string | null): void {}

  return { sort, getSortFromUrl, setSort }
}
```

## Хук для получения объектов

Категории имеют разные методы для получения объектов, но одинаковый функционал для его вывода.
Поэтому используется кастомный хук `useCategoryObjects()` для вывода отфильтрованных и сортированных товаров. В будущем
этот хук будет дополнен пагинацией.

**Описание хука:**

```tsx
import { ObjectCard } from '@/types/ObjectCard'

interface Props {
  initList: ObjectCard[]
  getObjects: (filter?: Filter[], sort?: Sort) => Promise<ObjectCard[]>
}

/**
 * Использует хуки {@link useCategoryFilter} и {@link useCategorySort} для контроля внутреннего состояния со списком объектов.
 * @param initList - Инициализирующий список объектов. Выводится пока не будет закончен запрос
 * @param getObjects - функция для запроса объектов
 */
function useCategoryObjects({ initList, getObjects }: Props) {
  const [list, setList] = useState<ObjectCard[]>(initList)
  const [isLoading, setIsLoading] = useState(false)
  const { filter } = useCategoryFilter()
  const { sort } = useCategorySort()

  useEffect(() => {
    async function updateState() {
      setIsLoading(true)

      const data = await getObjects(filter, sort)

      setList((current) => {
        if (JSON.stringify(data) === JSON.stringify(data)) {
          return current
        }

        return data
      })

      setIsLoading(false)
    }

    updateState()
  }, [sort, filter])

  return { list, isLoading }
}
```

## Примеры

**Пример изменения ссылки:**

1. Пользователь переходит на страницу категории ЖК, ссылка:<br>
   `/catalog/complexes`
2. Пользователь выставил у фильтра с `id: 1` значение на `value: [ "1 комната", "2 комнаты" ]` - получится ссылка:<br>
   `/catalog/complexes?filter[0][id]=1&filter[0][value]=1%20комната%2c2$20комнаты`
3. Пользователь выставил у фильтра с `id: 5` значение на `value: 1` - получится ссылка:<br>
   `/catalog/complexes?filter[0][id]=1&filter[0][value]=1%20комната%2c2$20комнаты&filter[1][id]=5&filter[1][value]=1`
4. Пользователь поменял у фильтра с `id: 1` значение на `value: [ "1 комната" ]` - получится ссылка:<br>
   `/catalog/complexes?filter[0][id]=1&filter[0][value]=1%20комната&filter[1][id]=5&filter[1][value]=1`

**Пример использования хуков:**

1. Используем `useCategoryFilter()` и вытаскиваем `addFilter()`
2. При изменении пользователем фильтра в `FilterPopup` используем `addFilter()`
3. В компоненте `CatalogContent` используем `useCategoryFilter()` и вытаскиваем `filter`.
4. Направляем `filter` в дописанный апи метод получения объектов категории.
5. Получаем ответ
