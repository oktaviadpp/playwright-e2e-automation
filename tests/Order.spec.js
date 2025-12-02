import {expect, test} from '@playwright/test'

/** TC-CO-001 : User Can Successfully View detail order */
test("User Can Successfully View detail order", async ({page}) => {
    //launch web
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    //Locators Login
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const btnLogin = page.locator("//input[@id='login']");

    //Locators Order
    const menuOrder = page.locator("[routerlink*='myorders']");
    const titleOrder = page.locator("h1.ng-star-inserted:has-text('Your Orders')");
    const buttonView = page.locator("button")

    //process login
    await email.fill("oktav1@gmail.com");
    await password.fill("Testing12345@");
    await btnLogin.click();
    await page.waitForLoadState('networkidle');
});