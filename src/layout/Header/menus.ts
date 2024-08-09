import { PATHS } from '@/globals/paths'

export interface MenuItem {
  title: string
  href: string
}

export const newBuildingsMenu: MenuItem[] = [
  {
    title: 'Квартиры',
    href: `/${PATHS.CATALOG}/${PATHS.NEW_BUILDINGS}/${PATHS.APARTMENTS}`,
  },
  { title: 'Жилые комплексы', href: `/${PATHS.CATALOG}/${PATHS.NEW_BUILDINGS}/${PATHS.COMPLEXES}` },
]

export const aboutMenu: MenuItem[] = [
  { title: 'Об агентстве', href: '#' },
  {
    title: 'Риелторы',
    href: '#',
  },
  { title: 'Обучение', href: '#' },
  { title: 'Вакансии', href: '#' },
  { title: 'Отзывы', href: '#' },
  {
    title: 'Блог',
    href: '#',
  },
]
