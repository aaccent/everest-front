import { ROUTES } from '@/globals/paths'

export interface MenuItem {
  title: string
  href: string
}

export const newBuildingsMenu: MenuItem[] = [
  {
    title: 'Квартиры',
    href: ROUTES.NEW_BUILDINGS,
  },
  {
    title: 'Жилые комплексы',
    href: ROUTES.COMPLEXES,
  },
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
