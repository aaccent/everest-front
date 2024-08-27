import { LogError } from '@/globals/api/LogError'

/**
 * Убирает из `object` ключи со значениями `undefined` и преобразовывает в {@link URLSearchParams}
 * @param object - Любой объект
 */
function convertObjectToURLSearchParams(object: object) {
  const filtered = Object.entries(object).filter(([_, value]) => value !== undefined)
  return new URLSearchParams(filtered)
}

export type SlashPath = `/${string}`

/**
 * Преобразовывает строку в JSON Объект.
 * Оборачивает try catch объявление в `async` функцию для использования `await` оператора
 * @typeParam TType - тип возвращаемый при успешной конвертации
 * @return JSON Объект если успешно, иначе `false`
 * */
export async function tryJSONParse<TType extends any = any>(value: any): Promise<TType | false> {
  try {
    return JSON.parse(value)
  } catch {
    return false
  }
}

export type APIRequest<TQuery extends object = object> = TQuery

export type APIResponse<TResponse extends object = object> = {
  data: TResponse
  message?: string
}

export type SupportedMethod = 'POST' | 'GET'

/**
 * @typeParam TRequest - Тип, передаваемый в `body` запроса. Если `false`, то значит что его ненужно указывать
 * */
type ApiCallOptions<TRequest extends APIRequest | false = false> = TRequest extends false
  ? {
      /** Запрос к апи описан в {@link APIRequest}. */
      request?: never
      /** @default - POST */
      method?: SupportedMethod
    }
  : {
      /** Запрос к апи описан в {@link APIRequest}. */
      request: TRequest
      /** @default - POST */
      method?: SupportedMethod
    }

/**
 * Отправляет запрос на указанный `uri` с методом `options.method` и телом `options.body`.
 *
 * Если `method` - `GET`, то `body` преобразовывается в {@link URLSearchParams}.
 *
 * Если `method` - `POST`, то `body` преобразовывается с помощью [JSON.stringify()]{@link JSON.stringify}.
 *
 * Запрос к `/api/v1/catalog/new-buildings` с http методом `POST`:
 * ```js
 * apiCall('/catalog/new-buildings', { method: 'POST' })
 * ```
 * @param uri - Путь к методу без `/api/v1` и с `/` в начале.
 * @param options - Параметры запроса. Описан в {@link ApiCallOptions}
 * */
export async function apiCall<TRequest extends APIRequest | false = false, TResponse extends APIResponse = APIResponse>(
  uri: SlashPath,
  options: ApiCallOptions<TRequest>,
): Promise<TResponse> {
  const { method = 'POST', request } = options

  let url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${uri}`).toString()
  const fetchInit: RequestInit = {
    method,
    headers: {
      Accept: 'application/json',
    },
  }

  if (request && method === 'POST') {
    fetchInit.body = JSON.stringify(request)
    fetchInit.headers = {
      'Content-Type': 'application/json',
    }
  }

  if (request && method === 'GET') {
    // URLSearchParams преобразовывает объекты с boolean и числами в необходимый формат.
    // Но не убирает свойства со значением undefined, поэтому используем функцию обертку для URLSearchParams
    const searchParams = convertObjectToURLSearchParams(request)
    url += `?${searchParams.toString()}`
  }
  if (method === 'POST') {
    fetchInit.headers = Object.assign(fetchInit.headers || {}, {
      'Content-Type': 'application/json',
    })
  }

  const res = await fetch(url, fetchInit)
  const text = await res.text()
  const json = await tryJSONParse(text)

  if (!json) {
    throw new LogError(`Return body from ${method}:${uri} not valid json`, {
      path: url,
      body: text,
      request,
      requestStr: JSON.stringify(request),
    })
  }

  if (res.status === 500) {
    throw new LogError(`Method ${method}:${uri} ended with 500 code`, {
      request,
      text,
    })
  }

  // Чтобы не спамил ошибками АПИ на проде
  if (!res.ok && process.env.NODE_ENV === 'development') {
    console.error(`Error from api while fetching ${method}:${uri}`, {
      path: url,
      status: res.status,
      request,
      json,
    })
  }

  return json
}

export const isNeedMockData = process.env.NEXT_PUBLIC_MOCK_API_RESPONSE === 'true'
