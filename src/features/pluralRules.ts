const pluralRules = new Intl.PluralRules('ru-RU')

interface PluralObject {
  readonly suffixes: Map<Intl.LDMLPluralRule, string>
  readonly get: (value: number) => string
}

/** Слово 'Предложения' с суффиксами в зависимости от числа */
export const suggestionPlural: PluralObject = {
  suffixes: new Map([
    ['one', 'предложение'],
    ['few', 'предложения'],
    ['many', 'предложений'],
  ]),
  get(value: number) {
    const rule = pluralRules.select(value)
    return this.suffixes.get(rule) || ''
  },
}
