import { test, expect } from '@playwright/test'
import { TEST_ID } from '@/globals/testIds'

test('Should load main page', async ({ page }) => {
  const res = await page.goto('/')

  expect(res?.status()).toEqual(200)
})

test('Should load catalog/new-buildings page', async ({ page }) => {
  const res = await page.goto('/catalog/new-buildings')

  expect(res?.status()).toEqual(200)
})

test('Should load catalog/secondary-housing page', async ({ page }) => {
  const res = await page.goto('/catalog/secondary-housing')

  expect(res?.status()).toEqual(200)
})

test('Should load catalog/secondary-housing subcategory page', async ({ page }) => {
  const res = await page.goto('/catalog/secondary-housing')

  expect(res?.status()).toEqual(200)

  await page.getByTestId(TEST_ID.SUBCATEGORY).first().click()
  await expect(page.getByRole('heading', { level: 1 })).not.toHaveText('Вторичная недвижимость', { ignoreCase: true })
})
