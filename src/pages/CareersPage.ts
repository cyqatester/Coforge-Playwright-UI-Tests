import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CareersPage extends BasePage {
  readonly itJobOpeningsHeading: Locator;
  readonly keywordSearch: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.itJobOpeningsHeading = page.getByRole('heading', { name: /IT job openings/i }).first();

    // The careers page has used different form markup over time. Prefer the
    // accessible placeholder/name and constrain fallback lookup to the section.
    const section = page.locator('section').filter({ hasText: /IT job openings/i }).first();

    this.keywordSearch = page.locator('input[data-testid="search-input"]');
    this.searchButton = page.getByTestId('search-icon-button');

  }


  async acceptCookiesIfPresent(): Promise<void> {
    // Cookie consent may appear as a modal/banner after arriving from the
    // Careers navigation. If it does, accept it; otherwise continue normally.
    const allowAllButton = this.page.getByRole('button', { name: 'Allow all' });

    try {
      await allowAllButton.waitFor({ state: 'visible', timeout: 3_000 });
      await allowAllButton.click();
      await expect(allowAllButton).toBeHidden({ timeout: 10_000 });
    } catch {
      // No consent prompt appeared (or it was already handled); do not block TC3.
    }
  }

  async searchForKeyword(keyword: string): Promise<void> {
    await expect(this.itJobOpeningsHeading).toBeVisible();
    await this.itJobOpeningsHeading.scrollIntoViewIfNeeded();
    await expect(this.keywordSearch).toBeVisible();
    await this.keywordSearch.fill(keyword);
    await expect(this.searchButton).toBeVisible();
    await this.searchButton.click();
  }

  async openFirstSeniorTestEngineerResult(): Promise<void> {
    // Match a link first (the job title normally links to the job detail page),
    // then allow a heading/text fallback if the site changes its result markup.
    const titleLink = this.page.getByRole('link', { name: /senior test engineer/i }).first();
    const titleText = this.page.getByText(/^senior test engineer$/i).first();
    const result = titleLink.or(titleText);
    await expect(result).toBeVisible({ timeout: 15_000 });
    await result.scrollIntoViewIfNeeded();
    await result.click();
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
    await this.page.waitForTimeout(3000);
  }
}
