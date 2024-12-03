declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      DADATA_TOKEN: string
      PORT: string
      APP_ENV: 'production' | 'development' | 'test'
    }
  }
}

export {}
