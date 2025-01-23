import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';


// Declare the types of your fixtures. 

type MyPagesFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
};

export const test = base.extend<MyPagesFixtures>({ 
    homePage: async ({ page }, use) => { 
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await use(homePage);
    },
    loginPage: async ({ page }, use) => { 
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    registerPage: async ({ page }, use) => { 
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },
});

export { expect } from "@playwright/test";