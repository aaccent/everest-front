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

Фильтры в апи будут отправляться `base64` строкой, поэтому в ссылке храним уже готовое к отправке.

## Парсинг и кодирование base64

Для кодирования в `base64` используется функция
[`btoa()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa)
с `JSON.stringify()`:

```js
const base64 = btoa(JSON.stringify({ a: 1 }))
console.log(base64) // e2E6MX0=
```

Для парсинга `base64` обратно в объект используется
[`atob()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/atob)
с `JSON.parse()`:

```js
const obj = JSON.parse(atob('e2E6MX0='))
console.log(obj) // {a:1}
```

Изначально функции задумывались для работы только с латиницей, а у нас используется кириллица.
Поэтому нужно превращать сначала буфер, а потом уже в `base64`.
Подробнее с кодом в [документации MDN](https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem)

В `base64` есть символы `=` и `+`, которые используются в ссылках, то строку нужно экранировать с помощью
[`encodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

## Хук фильтрации

Управление GET параметром происходит через кастомный хук `useCategoryFilter()`.
Состояние текущего фильтра хранится в `filter`. Состояние необходимо чтобы компонент не пересовывался лишний раз из-за
смены `searchParams`.

Когда пользователь меняет фильтр в попапе `FilterPopup` или блоке `QuickFilter`,
то через `addFilter()` они кодируются в `base64` и добавляются в GET параметр `filter`.

При изменении GET параметров:

1. Значение сохраняется в переменную с помощью `getFilterSearchParams()`
2. Сравнивается с `filter.str`
3. Если строки равны, то состояние не меняется
4. Если разные, то строка парсится с помощью `parseSearchParamsToFilter()` и записывается в состояние

**Описание хука:**

````tsx
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

  /**
   * Вытаскивает значение GET параметра `filter` из ссылки.
   * @return `base64` строку
   */
  function getFilterSearchParams(): string {}

  /**
   * Читает из GET параметров ссылки значение фильтра,
   * парсит из base64 в JSON строку, затем в [Filter[]]{@link Filter}.
   * @return `Filter[]` если значение установлено, иначе пустой массив.
   */
  const parseSearchParamsToFilter = useCallback((base64: string): Filter[] => {})

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
   * Кодирует значения в `base64` и добавляет результат в
   * GET параметры ссылки новое значение `value` фильтра по `id`.
   * Если значение уже существует, то заменяет его новым.
   *
   * ```js
   * addFilter(1, ["value1", "value2"])
   * ```
   * добавит в ссылку массив с объектом
   * ```json
   * [{id:1,value:["value1","value2"]}]
   * ```
   * в base64 представлении
   * @param id - идентификатора фильтра
   * @param value - значение фильтра. Если передаётся boolean, то в
   * ссылку попадают `"true"` и `"false"` строки
   */
  function addFilter(id: number, value: number[] | string[] | boolean): void {}

  return { filter, getFilterFromUrl, addFilter }
}
````

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

interface Props<TType extends object> {
  initList: TType[]
  getObjects: (filter?: Filter[], sort?: Sort) => Promise<TType[]>
}

/**
 * Использует хуки {@link useCategoryFilter} и {@link useCategorySort} для контроля внутреннего состояния со списком объектов.
 * @param initList - Инициализирующий список объектов. Выводится пока не будет закончен запрос
 * @param getObjects - функция для запроса объектов
 */
function useCategoryObjects<TType extends object>({ initList, getObjects }: Props<TType>) {
  const [list, setList] = useState<TType[]>(initList)
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

### Ссылка

1. Пользователь переходит на страницу категории ЖК, ссылка:<br>
   `/catalog/complexes`
2. Пользователь выставил у фильтра с `id: 1` значение на `value: [ "1 комната", "2 комнаты" ]` - получился объект:<br>
   ```json
   [{ "id": 1, "value": ["1 комната", "2 комнаты"] }]
   ```
   Который превращается в base64 строку:<br>
   ```base64
   W3siaWQiOjEsInZhbHVlIjpbIjEg0LrQvtC80L3QsNGC0LAiLCIyINC60L7QvNC90LDRgtGLIl19XQ%3D%3D
   ```
   и в ссылку:<br>
   `/catalog/complexes?filter=W3tpZDoxLHZhbHVlOlsiMSDQutC-0LzQvdCw0YLQsCIsIjIg0LrQvtC80L3QsNGC0YsiXX1d`
3. Пользователь выставил у фильтра с `id: 5` значение на `value: true` - получился объект:<br>
   ```json
   [
     { "id": 1, "value": ["1 комната", "2 комнаты"] },
     { "id": 5, "value": true }
   ]
   ```
   Который превращается в base64 строку:<br>
   ```base64
   W3siaWQiOjEsInZhbHVlIjpbIjEg0LrQvtC80L3QsNGC0LAiLCIyINC60L7QvNC90LDRgtGLIl19LHsiaWQiOjUsInZhbHVlIjp0cnVlfV0=
   ```
   и в ссылку:<br>
   `/catalog/complexes?filter=W3siaWQiOjEsInZhbHVlIjpbIjEg0LrQvtC80L3QsNGC0LAiLCIyINC60L7QvNC90LDRgtGLIl19LHsiaWQiOjUsInZhbHVlIjp0cnVlfV0%3D`
4. Пользователь поменял у фильтра с `id: 1` значение на `value: [ "1 комната" ]` - получился объект:<br>
   ```json
   [
     { "id": 1, "value": ["1 комната"] },
     { "id": 5, "value": true }
   ]
   ```
   Который превращается в base64 строку:<br>
   ```base64
   W3siaWQiOjEsInZhbHVlIjpbIjEg0LrQvtC80L3QsNGC0LAiXX0seyJpZCI6NSwidmFsdWUiOnRydWV9XQ==
   ```
   и в ссылку:<br>
   `/catalog/complexes?filter=W3siaWQiOjEsInZhbHVlIjpbIjEg0LrQvtC80L3QsNGC0LAiXX0seyJpZCI6NSwidmFsdWUiOnRydWV9XQ%3D%3D`
5. Пользователь выставил сортировку на `cheap` - ссылка:<br>
   `/catalog/complexes?filter=W3siaWQiOjEsInZhbHVlIjpbIjEg0LrQvtC80L3QsNGC0LAiXX0seyJpZCI6NSwidmFsdWUiOnRydWV9XQ%3D%3D&sort=cheap`
6. Пользователь выставил сортировку на `popular` - ссылка:<br>
   `/catalog/complexes?filter=W3siaWQiOjEsInZhbHVlIjpbIjEg0LrQvtC80L3QsNGC0LAiXX0seyJpZCI6NSwidmFsdWUiOnRydWV9XQ%3D%3D&sort=popular`

### Хуки

В компоненте попапа фильтра применяем хук `useCategoryFilter()`:<br>

```tsx
interface Props {
  list: Filter[]
}

// Подобное же для `QuickFilter`
function FilterPopup({ list }: Props) {
  const { filter, addFilter } = useCategoryFilter()

  function changeHandler(id: number, value: string[] | number[] | boolean) {
    addFilter(id, value)
  }

  function showFilters() {
    return list.map((item) => {
      // Здесь ищет значение в filter по item.id, записывает в
      // переменную и передаёт в value компонента фильтра

      switch (obj.type) {
        case 'multilist':
          return <Selector onChange={changeHandler} />
        case 'range':
          return <Range onChange={changeHandler} />
        default:
          return null
      }
    })
  }

  return <>{showFilters()}</>
}
```

Использование `useCategoryObjects()`:<br>

```tsx
'use client'
import { Props as CategoryObjectsHookProps } from '@/features/useCategoryObjects'

type CatalogContentProps = { category: CategoryForGeneratingLink } & (
  | ({
      type: 'complex'
    } & CategoryObjectsHookProps<ComplexCard>)
  | ({
      type: 'secondary'
    } & CategoryObjectsHookProps<ObjectCard>)
  | ({
      type: 'layout'
    } & CategoryObjectsHookProps<LayoutCard>)
)

// Не вижу другого варианта кроме как делать вывод объект полностью клиентским.
// То-есть текущие tileView и listView убираются и всё выводится отсюда
function CatalogContent({ type, category, initList, getObjects }: CatalogContentProps) {
  const { list, isLoading } = useCategoryObjects(initList, getObjects)
  const { view } = useContext(CategoryContext)

  function showList() {
    return list.map((item) => {
      switch (type) {
        case 'complex':
          return view === 'list' ? <ComplexFullCard /> : <ComplexCard />
        case 'layout':
          return // По примеру с complex
        case 'secondary':
        default:
          return // По примеру с complex
      }
    })
  }

  return (
    <>
      <div className={`flex flex-col ${viewStyle}`}>{showList()}</div>
    </>
  )
}
```
