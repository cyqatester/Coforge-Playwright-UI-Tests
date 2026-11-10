import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test('search IT job openings and open the first Senior Test Engineer result', async ({ page }) => {
  const home = new HomePage(page);

  const careers = await home.openCareers();
  await careers.acceptCookiesIfPresent();
  await expect(careers.itJobOpeningsHeading).toBeVisible();

  await careers.searchForKeyword('test');
  await careers.openFirstSeniorTestEngineerResult();
});
