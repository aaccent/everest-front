export async function tryJSONParse<TType extends any = any>(value: any): Promise<TType | false> {
  try {
    return JSON.parse(value)
  } catch {
    return false
  }
}

export type APIRequest<TQuery extends object | false> = TQuery extends false ? {} : { query: TQuery }

export type APIResponse<TResponse extends object> = {
  data: TResponse
}

type ApiCallOptions<TRequest extends APIRequest<any>> =
  | {
      request?: TRequest
      method?: 'POST'
    }
  | {
      request?: never
      method: 'GET'
    }

export async function apiCall<
  TRequest extends APIRequest<any> = APIRequest<any>,
  TResponse extends APIResponse<any> = APIResponse<any>,
>(uri: string, { method = 'POST', request }: ApiCallOptions<TRequest>): Promise<TResponse> {
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
