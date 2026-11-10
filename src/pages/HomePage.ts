import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CareersPage } from './CareersPage';

export class HomePage extends BasePage {
  readonly investorsLink: Locator;
  readonly careersLink: Locator;
  readonly aboutUsLink: Locator;

  constructor(page: Page) {
    super(page);
    // Role/name selectors are preferred; fallback text matching tolerates minor nav markup changes.
    this.investorsLink = page.getByRole('link', { name: /investors/i }).first();
    this.careersLink = page.getByRole('link', { name: /^careers?$/i }).first();
    this.aboutUsLink = page.getByRole('link', { name: /about us/i }).first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page).toHaveURL(/coforge\.com/);
    // await expect(this.page.locator('body')).toBeVisible();
  }

  async expectMainPageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/coforge/i);
    await expect(this.page.locator('main').or(this.page.locator('body'))).toBeVisible();
  }

  async expectTopNavigationVisible(): Promise<void> {
    await expect(this.investorsLink).toBeVisible();
    await expect(this.careersLink).toBeVisible();
    await expect(this.aboutUsLink).toBeVisible();
  }

  async openCareers(): Promise<CareersPage> {
    await this.page.goto('https://careers.coforge.com/coforge/')
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(/careers\.coforge\.com/i);
    return new CareersPage(this.page);
  }
}
