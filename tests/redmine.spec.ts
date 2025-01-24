
import { test, expect } from '../fixtures/fixturePages';
import { TestData } from '../utils/faker-data';
import * as dotenv from 'dotenv';
dotenv.config();


test.describe('Redmine Tests', () => {
  
  test('Search with valid input', async ({ page, homePage }) => {
    await homePage.search('documentation');
    await expect(page).toHaveURL(/search?/);

    const searchResults = page.locator('#search-results .highlight').first();
    await expect(searchResults).toContainText('Documentation');
  });

  test('User log in with valid credentials', async ({ page, homePage, loginPage }) => {
    const login = process.env.VALID_LOGIN as string;
    const password = process.env.VALID_PASSWORD as string;
    const loggedAs = login.toLowerCase();
    await homePage.clickSignIn();
    await loginPage.login(login, password);

    await expect(page.locator('#loggedas')).toHaveText(`Logged in as ${loggedAs}`);
  });

  test('Registration of a user using valid data', async ({ page, homePage, registerPage }) => {
    const userData = TestData.generateUser();  
    await homePage.clickRegister();
    await registerPage.register({
      username: userData.username,
      password: userData.password,
      firstname: userData.firstName,
      lastname: userData.lastName,
      email: userData.email,
    });

    await expect(page).toHaveURL(/login/);
    await expect(page.locator('#flash_notice')).toHaveText(`Account was successfully created. An email containing the instructions to activate your account was sent to ${userData.email}.`);
  });

  test('Registration of a user using invalid data', async ({ page, homePage, registerPage }) => {
    const userData = TestData.generateUser();
    await homePage.clickRegister();

    await registerPage.register({
      username: userData.username,
      password: userData.password,
      firstname: userData.firstName,
      lastname: userData.lastName,
      email: `${userData.username}yahoo.com`,
    });

    const errorAlert = page.locator('#errorExplanation');
    await expect(page).toHaveURL(/account\/register/);
    await expect(errorAlert).toContainText('Email is invalid');
  });

  test('Validate main menu navigation links on homepage', async ({ page, homePage }) => {
    const menuLinks = homePage.menuLink 
    const linkCount = await menuLinks.count();
    expect(linkCount).toBe(9); // Ensure the count matches expectations
  
    for (let i = 0; i < linkCount; i++) {
      const link = menuLinks.nth(i);
      await link.click();
      const text = await link.innerText();
      const pageTitle = await page.title();
       // Check if the text is not in the excluded list before proceeding with the assertion
      if (text.includes('Wiki')) {
        console.log(`Skipping assertion for text: ${text}`);

      } else {
        await expect(page.title()).resolves.toContain(text);
      }
      await page.goBack();
    }
  });
});