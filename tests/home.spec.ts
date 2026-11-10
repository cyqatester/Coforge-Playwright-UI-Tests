import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Coforge home page', () => {
  test('main page loads', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.expectMainPageLoaded();
  });

  test('top navigation displays Investors, Careers, and About Us', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.expectTopNavigationVisible();
  });
});
