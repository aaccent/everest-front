declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_MOCK_API_RESPONSE: 'true' | 'false'
    }
  }
}

export {}
