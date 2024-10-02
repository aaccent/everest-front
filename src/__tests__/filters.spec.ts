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

    await expect(page.locator('[data-filter="tag"]', { hasText: await filterOption.innerText() })).toBeVisible({
      timeout: 10000,
    })
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
