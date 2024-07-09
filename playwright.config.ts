import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: '././src/__tests__',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3060',
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
    command: 'pnpm run start:standalone',
    url: 'http://localhost:3060',
    reuseExistingServer: !process.env.CI,
  },
})
