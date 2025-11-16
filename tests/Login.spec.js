import {test, expect} from '@playwright/test'

/* Test case : Validation Tile*/
test('Validation Title', async ({page}) => {
    //launch web
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    //expected result
    await expect(page).toHaveTitle('OrangeHRM');
});

/** TC-Login-001 : Login using valid username and password */
test('Login using valid username and password', async({page})=>{
    //launch web
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    //get element using xpath
    await page.locator("//input[@name='username']").fill("Admin");
    await page.locator("//input[@name='password']").fill("admin123");
    await page.locator("//button[@type='submit' and contains(., 'Login')]").click();
    expect(page.locator("//h6[@class='oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module']")).toHaveClass("oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module");
    await page.screenshot({path: "screenshot/login_sukses.png"});
});

