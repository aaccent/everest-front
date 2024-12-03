const pluralRules = new Intl.PluralRules('ru-RU')

interface PluralObject {
  readonly words: Map<Intl.LDMLPluralRule, string>
  readonly get: (value: number) => string
}

/**
 * @param word1 - Слово с окончанием для "один ___"
 * @param word2 - Слово с окончанием для "два ___"
 * @param word8 - Слово с окончанием для "восемь ___"
 * */
function createPlural(word1: string, word2: string, word8: string): PluralObject {
  return {
    words: new Map([
      ['one', word1],
      ['few', word2],
      ['many', word8],
    ]),
    get(value: number) {
      const rule = pluralRules.select(value)
      return this.words.get(rule) || ''
    },
  }
}

/** Слово 'Предложения' с суффиксами в зависимости от числа */
export const suggestionPlural = createPlural('предложение', 'предложения', 'предложений')

/** Слово 'Квартиры' с суффиксами в зависимости от числа */
export const flatPlural = createPlural('квартира', 'квартиры', 'квартир')

/** Слово 'Объект' с суффиксами в зависимости от числа */
export const objectPlural = createPlural('объект', 'объекта', 'объектов')

/** Слово 'фотография' с суффиксами в зависимости от числа */
export const photosPlural = createPlural('фотография', 'фотографии', 'фотографий')

/** Слово 'минута' с суффиксами в зависимости от числа */
export const minutesPlural = createPlural('минута', 'минуты', 'минут')

/** Слово 'час' с суффиксами в зависимости от числа */
export const hoursPlural = createPlural('час', 'часа', 'часов')

/** Слово 'день' с суффиксами в зависимости от числа */
export const daysPlural = createPlural('день', 'дня', 'дней')

/** Слово 'неделя' с суффиксами в зависимости от числа */
export const weeksPlural = createPlural('неделя', 'недели', 'недель')

/** Слово 'месяц' с суффиксами в зависимости от числа */
export const monthsPlural = createPlural('месяц', 'месяца', 'месяцев')
