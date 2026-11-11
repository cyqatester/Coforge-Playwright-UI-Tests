import { test } from '../src/fixtures/test-fixtures';

test.describe('Coforge home page', () => {
  test('main page loads', async ({ homePage, commonPage }) => {
    await homePage.goto();
    await homePage.expectMainPageLoaded();
  });

  test('top navigation displays Investors, Careers, and About Us', async ({ homePage, commonPage }) => {
    await homePage.goto();
    await commonPage.acceptCookiesIfPresent();
    await homePage.expectTopNavigationVisible();
  });
});



