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
}

/**
 * @typeParam TRequest - Тип, передаваемый в body запроса. Если false, то значит что его ненужно указывать
 * */
type ApiCallOptions<TRequest extends APIRequest | false = false> =
  | {
      /** При 'GET' методе нельзя указать request */
      request?: never
      method: 'GET'
    }
  | (TRequest extends false
      ? {
          /** Запрос к апи описан в {@link APIRequest}. */
          request?: never
          method?: 'POST'
        }
      : {
          /** Запрос к апи описан в {@link APIRequest}. */
          request: TRequest
          method?: 'POST'
        })

/**
 * @param uri - Путь к методу без слэша в начале и "/api/v1".
 * @param options - Параметры запроса. Описан в {@link ApiCallOptions}
 * @example
 * Запрос к /api/v1/catalog/new-buildings с http методом 'POST':
 * ```javascript
 * apiCall('catalog/new-buildings', { method: 'POST' })
 * ```
 * */
export async function apiCall<TRequest extends APIRequest | false = false, TResponse extends APIResponse = APIResponse>(
  uri: string,
  options: ApiCallOptions<TRequest>,
): Promise<TResponse> {
  const { method = 'POST', request } = options

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${uri}`
  const fetchInit: RequestInit = {
    method,
    ...(method === 'POST' ? { body: JSON.stringify(request) } : {}),
  }

  const res = await fetch(url, fetchInit)
  const text = await res.text()
  const json = await tryJSONParse(text)

  if (!json) {
    console.error(`Return body from ${method}:${uri} not valid json`, {
      path: url,
      body: text,
      request,
      requestStr: JSON.stringify(request),
    })

    throw new Error('Return body not valid json')
  }

  if (!res.ok && process.env.NODE_ENV === 'development') {
    console.error(`Error from api while fetching ${method}:${uri}`, {
      path: url,
      status: res.status,
      request,
      json,
    })
  }

  if (res.status === 500) {
    console.error(`Method ${method}:${uri} ended with 500 code`, {
      request,
      text,
    })
    throw new Error(`Error 500 on api server while executing ${method}:${uri}`)
  }

  return json
}

export const isNeedMockData = process.env.NEXT_PUBLIC_MOCK_API_RESPONSE === 'true'
