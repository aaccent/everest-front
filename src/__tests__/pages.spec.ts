import { test, expect } from '@playwright/test'
import { TEST_ID } from '@/globals/testIds'
import { ROUTES } from '@/globals/paths'

test('Should load main page', async ({ page }) => {
  const res = await page.goto('/')

  expect(res?.status()).toEqual(200)
})

test('Should load new-buildings category page', async ({ page }) => {
  const res = await page.goto(ROUTES.NEW_BUILDINGS)

  expect(res?.status()).toEqual(200)
})

test('Should load secondary-housing category page', async ({ page }) => {
  const res = await page.goto(ROUTES.SECONDARY_HOUSING)

  expect(res?.status()).toEqual(200)
})

test('Should load first subcategory page', async ({ page }) => {
  const res = await page.goto(ROUTES.SECONDARY_HOUSING)

  expect(res?.status()).toEqual(200)

  const category = page.getByTestId(TEST_ID.SUBCATEGORY).first()
  const categoryName = await category.innerText()

  await category.click()
  await category.waitFor({ state: 'detached' })
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(categoryName, { ignoreCase: true })
})

test('Should load object detail page', async ({ page }) => {
  const res = await page.goto(ROUTES.SECONDARY_HOUSING)

  expect(res?.status()).toEqual(200)

  await page.getByRole('main').getByTestId(TEST_ID.OBJECT_CARD).first().click()
  await expect(page.getByTestId(TEST_ID.OBJECT_DETAIL_H1)).toBeAttached()
})

test('Should load complexes list page', async ({ page }) => {
  const res = await page.goto(ROUTES.COMPLEXES)

  expect(res?.status()).toEqual(200)
})

test('Should load complex detail page', async ({ page }) => {
  const res = await page.goto(ROUTES.COMPLEXES)

  expect(res?.status()).toEqual(200)

  await page
    .getByRole('main')
    .getByTestId(TEST_ID.COMPLEX_CARD)
    .first()
    .click({ position: { x: 25, y: 25 } })
  await expect(page.getByTestId(TEST_ID.COMPLEX_DETAIL_H1)).toBeAttached()
})

test('Should load contacts page', async ({ page }) => {
  const res = await page.goto(ROUTES.CONTACTS)

  expect(res?.status()).toEqual(200)
  await expect(page.getByTestId(TEST_ID.DETAIL_OFFICE_INFO)).toBeAttached()
})
