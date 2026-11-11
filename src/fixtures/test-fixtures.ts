import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CareersPage } from '../pages/CareersPage';
import { CommonPage } from '../pages/CommonPage';

type PageObjectFixtures = {
  homePage: HomePage;
  careersPage: CareersPage;
  commonPage: CommonPage;
};

/**
 * Creates Page Objects for the current test's isolated Playwright Page.
 * Playwright automatically creates and disposes the page for each test.
 */
export const test = base.extend<PageObjectFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  careersPage: async ({ page }, use) => {
    await use(new CareersPage(page));
  },
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },
});

export { expect };
