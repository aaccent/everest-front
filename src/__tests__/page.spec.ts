import { test, expect } from '@playwright/test'
import { TEST_ID } from '@/globals/testIds'
import { ROUTES } from '@/globals/paths'

test('Should load main page', async ({ page }) => {
  const res = await page.goto('/')

  expect(res?.status()).toEqual(200)
})

test('Should load catalog/new-buildings page', async ({ page }) => {
  const res = await page.goto(ROUTES.NEW_BUILDINGS)

  expect(res?.status()).toEqual(200)
})

test('Should load catalog/secondary-housing page', async ({ page }) => {
  const res = await page.goto(ROUTES.SECONDARY_HOUSING)

  expect(res?.status()).toEqual(200)
})

test('Should load catalog/secondary-housing subcategory page', async ({ page }) => {
  const res = await page.goto(ROUTES.SECONDARY_HOUSING)

  expect(res?.status()).toEqual(200)

  const category = page.getByTestId(TEST_ID.SUBCATEGORY).first()
  const categoryName = await category.innerText()

  await category.click()
  await page.getByRole('heading', { level: 1 }).waitFor({ state: 'attached' })
  await category.waitFor({ state: 'detached' })
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(categoryName, { ignoreCase: true })
})

test('Should load object page', async ({ page }) => {
  const res = await page.goto(ROUTES.SECONDARY_HOUSING)

  expect(res?.status()).toEqual(200)

  const object = page.getByTestId(TEST_ID.OBJECT).first()
  await object.click()

  await page.getByRole('heading', { level: 1 }).waitFor({ state: 'attached' })
  await expect(page).toHaveURL(/.+\/object\/.+/)
})
