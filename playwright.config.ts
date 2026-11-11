import { defineConfig, devices } from '@playwright/test';

const environment = (process.env.TEST_ENV ?? 'dev').toLowerCase();
const baseUrls: Record<string, string> = {
  dev: process.env.BASE_URL_DEV ?? 'https://www.coforge.com/',
  qa: process.env.BASE_URL_QA ?? 'https://www.coforge.com/',
  prod: process.env.BASE_URL_PROD ?? 'https://www.coforge.com/',
};

if (!baseUrls[environment]) {
  throw new Error(`Unsupported TEST_ENV "${environment}". Use dev, qa, or prod.`);
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: baseUrls[environment],
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    headless: true, //set to true before committing to github
    channel: 'chromium',
    launchOptions: {
      args: ['--disable-http2'],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
