/**
 * Преобразовывает строку в JSON Объект.
 * @typeParam TType - тип возвращаемый при успешной конвертации
 * @return JSON Объект если успешно, иначе `false`
 * */
export function syncTryJSONParse<TType extends any = any>(value: any): TType | false {
  try {
    return JSON.parse(value)
  } catch {
    return false
  }
}

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
