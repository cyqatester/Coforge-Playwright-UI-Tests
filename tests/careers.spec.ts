import { test, expect } from '../src/fixtures/test-fixtures';

test('search IT job openings and open the first Senior Test Engineer result', async ({ homePage, careersPage, commonPage }) => {
  await homePage.openCareers();
  await commonPage.acceptCookiesIfPresent();
  await expect(careersPage.itJobOpeningsHeading).toBeVisible();

  await careersPage.searchForKeyword('test');
  await careersPage.openFirstSeniorTestEngineerResult();
});

