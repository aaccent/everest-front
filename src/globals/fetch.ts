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
