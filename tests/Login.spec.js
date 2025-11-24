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

    /**wait for element stable | DISCOURAGED |
    await page.waitForLoadState('networkidle');
    */

    await text_Dashboard.waitFor();
    expect(text_Dashboard).toBeVisible();
    await page.screenshot({path: "screenshot/login_sukses.png"});
});

/**TC-Login-002 : Login using invalid username and password */
test('Login using invalid username and password', async({page}) => {
    //launch web
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    //variables | get element using xpath
    const username = page.locator("//input[@name='username']");
    const password = page.locator("//input[@name='password']");
    const btn_Login = page.locator("//button[@type='submit']");
    const error_msg = page.locator("//p[normalize-space()='Invalid credentials']");
    
    //process 
    await username.fill("admin123");
    await password.fill("Admin");
    await btn_Login.click();

    await error_msg.waitFor();
    expect(error_msg).toBeVisible();
    await page.screenshot({path: "screenshot/login_invalid username and password.png"});
});

/**TC-Login-003 : Login with empty username and password */
test('Login with empty username and password', async({page}) => {
    //launch web
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    //variables | get element using xpath
    const btn_Login = page.locator("//button[@type='submit']");
    const error_msg_empty = page.locator("(//span[normalize-space()='Required'])[1]");
    
    //process 
    await btn_Login.click();

    await error_msg_empty.waitFor();
    expect(error_msg_empty).toBeVisible();
    await page.screenshot({path: "screenshot/login_empty input.png"});
});


