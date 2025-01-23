import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly passwordConfField: Locator;
  readonly firstnameField: Locator;
  readonly lastnameField: Locator;
  readonly emailField: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginField = page.locator('#user_login');
    this.passwordField = page.locator('#user_password');
    this.passwordConfField = page.locator('#user_password_confirmation');
    this.firstnameField = page.locator('#user_firstname');
    this.lastnameField = page.locator('#user_lastname');
    this.emailField = page.locator('#user_mail');
    this.submitBtn = page.locator('input[type="submit"]');
  }

  async register(validData: { username: string; password: string; firstname: string; lastname: string; email: string; }) {
    await this.loginField.fill(validData.username);
    await this.passwordField.fill(validData.password);
    await this.passwordConfField.fill(validData.password);
    await this.firstnameField.fill(validData.firstname);
    await this.lastnameField.fill(validData.lastname);
    await this.emailField.fill(validData.email);
    await this.submitBtn.click();
  }
}