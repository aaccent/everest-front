import { expect, test } from '@playwright/test'
import { ROUTES } from '@/globals/paths'

test.describe('Filters', () => {
  test.beforeEach('Load page', async ({ page }) => {
    await page.goto(ROUTES.SECONDARY_HOUSING)
  })
  test('Should add get parameter to url', { tag: '@only-desktop' }, async ({ page }) => {
    const filterOption = page.locator('[data-filter="selector-inline-option"]').first()
    await filterOption.click()
    expect(page.url().includes('?filter')).toBeTruthy()
  })
  test('Filter tags should appear', { tag: '@only-desktop' }, async ({ page }) => {
    const filterOption = page.locator('[data-filter="selector-inline-option"]').first()
    await filterOption.click()

    await expect(page.locator('[data-filter="tag"]', { hasText: await filterOption.innerText() })).toBeVisible()
  })
  test('Clear filters', { tag: '@only-desktop' }, async ({ page }) => {
    const filterOption = page.locator('[data-filter="selector-inline-option"]').first()
    await filterOption.click()
    await expect(page.locator('[data-filter="selector-inline-option"]').first()).toBeVisible()

    const clearFilterButton = page.locator('[data-filter="clear-filters"]').locator('visible=true')
    await clearFilterButton.click()

    expect(page.url().includes('?filters')).toBeFalsy()
    await expect(page.locator('[data-filter="tag"]').first()).toBeHidden()
  })
  test('Should open Filter popup', async ({ page }) => {
    const detailedFilterButton = page.locator('[data-filter="detailedButton"]').locator('visible=true').first()
    await detailedFilterButton.click()
    await expect(page.locator('[data-filter ="popup"]', { hasText: 'Фильтры' })).toBeVisible()
  })
  test('Should change tags', { tag: '@only-desktop' }, async ({ page }) => {
    const detailedFilterButton = page.locator('[data-filter="detailedButton"]').locator('visible=true').first()
    await detailedFilterButton.click()

    const selector = page.locator('[data-filter="selector"]').first()
    await selector.click()

    const option = selector.locator('[data-filter="selector-option"]').locator('visible=true').first()
    await option.click()
    const tagWithOneOption = page.locator('[data-filter="tag"]').first()

    const option2 = selector.locator('[data-filter="selector-option"]').locator('visible=true').last()
    await option2.click()
    const tagWithTwoOptions = page
      .locator('[data-filter="tag"]', { hasText: await tagWithOneOption.innerText() })
      .first()

    await expect(tagWithTwoOptions).toHaveText(await tagWithOneOption.innerText())
    expect(tagWithOneOption !== tagWithTwoOptions).toBeTruthy()
  })
})

test('', async ({ page }) => {
  const testObject = {
    id: 30,
    name: 'Аппартаменты 1',
    complexName: null,
    address: null,
    seoUrl: 'appartamenty-1',
    minArea: 85,
    typeObject: 'secondary-housing',
    description: 'Описание аппартаментов 1',
    isReserved: false,
    price: 123456789,
    priceDiscount: 1450000,
    userId: null,
    gallery: {
      images: ['/images/penthouses.png', '/images/small-house.png', '/images/dormitory.png', '/images/penthouses.png'],
      count: 1,
    },
    completionDate: '2024-09-17 08:05:47',
    publicationTime: '2024-09-16 20:28:27',
    tags: [
      {
        id: 1,
        name: 'tag test',
      },
      {
        id: 2,
        name: 'tag 2 test',
      },
    ],
    characteristics: [
      {
        id: 65,
        value: '2 комн',
      },
      {
        id: 1080,
        value: ' м²',
      },
      {
        id: 1115,
        value: ' этаж',
      },
    ],
  }
  await page.goto(ROUTES.SECONDARY_HOUSING)
  await page.route(`${process.env.NEXT_PUBLIC_API_URL}/catalog/secondary-housing`, async (route) => {
    const response = await route.fetch()
    const json = await response.json()
    json.push(testObject)
    await route.fulfill({ response, json })
  })

  await expect(page.locator('div', { hasText: `${testObject.price} ₽` }).first()).toBeVisible()
})
