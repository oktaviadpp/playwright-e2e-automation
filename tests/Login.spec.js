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

    //variables | get element using xpath
    const username = page.locator("//input[@name='username']");
    const password = page.locator("//input[@name='password']");
    const btn_Login = page.locator("//button[@type='submit']");
    const text_Dashboard = page.locator("//h6[@class='oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module']");

    //process
    await username.fill("Admin");
    await password.fill("admin123");
    await btn_Login.click();
    await page.waitForLoadState('networkidle');
    expect(text_Dashboard).toBeVisible();
    await page.screenshot({path: "screenshot/login_sukses.png"});
});

