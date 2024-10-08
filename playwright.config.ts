import { defineConfig, devices } from '@playwright/test'
import { config } from '@dotenvx/dotenvx'

config()
let command = 'pnpm run start:ci'

if (process.env.APP_ENV === 'development') {
  config({ path: '.env.development' })
  command = 'pnpm run start:dev-ci'
}

if (process.env.APP_ENV === 'test') {
  config({ path: '.env.testing' })
  command = 'pnpm run start:test-ci'
}

export default defineConfig({
  testDir: './src/__tests__',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${process.env.PORT}`,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Desktop chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command,
    url: `http://localhost:${process.env.PORT}`,
    reuseExistingServer: !process.env.CI,
  },
})
