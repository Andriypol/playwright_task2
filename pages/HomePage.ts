import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly signInLink: Locator;
  readonly registerLink: Locator;
  readonly menuLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator('#q'); 
    this.signInLink = page.locator('a[href="/login"]'); 
    this.registerLink = page.locator('a[href="/account/register"]'); 
    this.menuLink = page.locator('#main-menu ul li a');
  }

  async navigateToHomePage() {
    await this.page.goto('/');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async clickSignIn() {
    await this.signInLink.click();
  }

  async clickRegister() {
    await this.registerLink.click();
  }

}