type ErrorData = {
  [index: string]: any
}

export class LogError extends Error {
  public data: any

  constructor(text: string, data?: ErrorData) {
    super(text)
    this.name = 'LogError'
    this.data = data
    console.error(data)
  }
}
