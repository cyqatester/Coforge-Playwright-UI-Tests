import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CommonPage extends BasePage {
  readonly allowAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.allowAllButton = this.page.getByRole('button', { name: 'Allow all' });
  }

  async acceptCookiesIfPresent(): Promise<void> {
    const allowAllButton = this.page.getByRole('button', {
        name: 'Allow all',
        exact: true
    });

    if (await allowAllButton.isVisible().catch(() => false)) {
        await allowAllButton.click({ timeout: 10_000 });
    }
    }
}