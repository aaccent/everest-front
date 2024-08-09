type ErrorData = {
  [index: string]: any
}

/**
 * Обертка для [встроенного Error]{@link Error} с возможностью передать `data`.
 *
 * Переданный `data` объект выводится с помощью {@link console.error}
 * */
export class LogError extends Error {
  public data: ErrorData | undefined

  /**
   * @param text - Текст ошибки. Необходим для передачи в конструктор {@link Error}
   * @param data - Объект с любыми значениями. Переданное выводится с помощью {@link console.error}
   */
  constructor(text: string, data?: ErrorData) {
    super(text)
    this.name = 'LogError'
    this.data = data
    if (data) console.error(data)
  }
}
