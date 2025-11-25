import {test} from '@playwright/test'

/**TC-Login-001 : Login with true credentials */
test("Login with true credentials", async ({page}) => {
    //launch web
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    //get element by xpath
    const email = page.locator("//input[@id='userEmail']");
    const password = page.locator("//input[@type='password']");
    const btnLogin = page.locator("//input[@id='login']");
    const title = page.locator("//h3[normalize-space() = 'Automation']");

    await email.fill("oktav1@gmail.com");
    await password.fill("Testing12345@");
    await btnLogin.click({delay:100});
    await title.waitFor();
    await page.screenshot({path: "screenshot/login/001_successfully login.png"})
});

/** TC-Login-002 : Login using invalid username and password */
test ("Login using invalid username and password", async ({page}) => {
    //launch web
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    //get element by xpath
    const email = page.locator("//input[@id='userEmail']");
    const password = page.locator("//input[@type='password']");
    const btnLogin = page.locator("//input[@id='login']");

    await email.fill("oktav@gmail.com");
    await password.fill("Testing12345@");
    await btnLogin.click({delay:100});
    await page.screenshot({path: "screenshot/login/002_login with invalid credentials.png"})
})

/** TC-Login-003 : Login with empty username and password */
test ("Login with empty username and password", async ({page}) => {
    //launch web
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    const errorRequired = page.locator("(//div[@class='invalid-feedback'])[1]");
    const btnLogin = page.locator("//input[@id='login']");

    await btnLogin.click({delay:100});
    await errorRequired.waitFor();
    await page.screenshot({path: "screenshot/login/003_login with empty input.png"})
})