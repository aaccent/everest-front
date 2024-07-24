import { LogError } from '@/globals/api/LogError'

/**
 * @typeParam TType - тип возвращаемый при успешной конвертации
 * @returns - JSON Объект при успешной конвертации и false при ошибке
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
 * @typeParam TRequest - Тип, передаваемый в body запроса. Если false, то значит что его ненужно указывать
 * */
type ApiCallOptions<TRequest extends APIRequest | false = false> = TRequest extends false
  ? {
      /** Запрос к апи описан в {@link APIRequest}. */
      request?: never
      method?: SupportedMethod
    }
  : {
      /** Запрос к апи описан в {@link APIRequest}. */
      request: TRequest
      method?: SupportedMethod
    }

/**
 * @param uri - Путь к методу без "/api/v1".
 * @param options - Параметры запроса. Описан в {@link ApiCallOptions}
 * @example
 * Запрос к /api/v1/catalog/new-buildings с http методом 'POST':
 * ```javascript
 * apiCall('/catalog/new-buildings', { method: 'POST' })
 * ```
 * */
export async function apiCall<TRequest extends APIRequest | false = false, TResponse extends APIResponse = APIResponse>(
  uri: `/${string}`,
  options: ApiCallOptions<TRequest>,
): Promise<TResponse> {
  const { method = 'POST', request } = options

  let url = new URL(uri, process.env.NEXT_PUBLIC_API_URL)
  const fetchInit: RequestInit = { method }

  if (request && method === 'POST') {
    fetchInit.body = JSON.stringify(request)
    fetchInit.headers = {
      'Content-Type': 'application/json',
    }
  }

  if (request && method === 'GET') {
    // @ts-expect-error URLSearchParams преобразовывает объекты с boolean и числами в необходимый формат
    const searchParams = new URLSearchParams(request)
    url = new URL(`${url.pathname}?${searchParams.toString()}`, process.env.NEXT_PUBLIC_API_URL)
  }

  const res = await fetch(url, fetchInit)
  const text = await res.text()
  const json = await tryJSONParse(text)

  if (!json) {
    throw new LogError('Return body from ${method}:${uri} not valid json', {
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
