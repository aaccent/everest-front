import { defineConfig, devices } from '@playwright/test'
import { config } from '@dotenvx/dotenvx'

config()

export default defineConfig({
  testDir: './src/__tests__',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 50000,
  use: {
    baseURL: `http://localhost:${process.env.PORT}`,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Desktop chrome',
      use: { ...devices['Desktop Chrome'] },
      grepInvert: /@only-mobile/,
    },

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      grepInvert: /@only-desktop/,
    },
  ],

  webServer: {
    command: 'pnpm run start:ci',
    url: `http://localhost:${process.env.PORT}`,
    reuseExistingServer: !process.env.CI,
  },
})
