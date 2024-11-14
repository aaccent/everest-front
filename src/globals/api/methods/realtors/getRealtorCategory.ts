export async function getRealtorCategory(realtorCode: string) {
  if (realtorCode === 'code1') return ['Квартиры', 'Комнаты', 'Пентхаусы']
  return ['Общежитие', 'Аппартаменты', 'Участок']
}
