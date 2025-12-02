import {test, expect} from '@playwright/test'

/** TC-Regis-002 : RRegistration with data already exists */
test('Registratio using valid input',async({page}) => {
    //launch web
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register")

    //get element using xpath
    const firstName = page.locator("//input[@id='firstName']");
    const lastName = page.locator("//input[@id='lastName']");
    const email = page.locator("//input[@id='userEmail']");
    const phoneNumber = page.locator("//input[@id='userMobile']");
    const occupation = page.locator("//select[@formcontrolname='occupation']");
    const genderFemale = page.locator("//input[@value='Male']");
    const password = page.locator("//input[@id='userPassword']");
    const confirmPassword = page.locator("//input[@id='confirmPassword']");
    const checkbox = page.locator("//input[@type='checkbox']");
    const buttonRegis = page.locator("//input[@id='login']");
    const msgToastError = page.locator("//div[@id='toast-container']//*[contains(text(),'User')]");
    

    //process
    await firstName.fill("Testing");
    await lastName.fill("on Test");
    await email.fill("oktav00@gmail.com");
    await phoneNumber.fill("1234567890");
    //select by value
    await occupation.selectOption("2: Student");
    //use this for checkbox or radio botton
    await genderFemale.click();
    await expect(genderFemale).toBeChecked();
    await password.fill("Testing12345@");
    await confirmPassword.fill("Testing12345@");
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await buttonRegis.click();
    // await expect(msgToastError).toHaveText("User already exisits with this Email Id");
    await page.screenshot({path: "screenshot/registration/data already exist.png"});
});

/** TC-Regis-003 : Registration with empty input */
test('Registration with empty input', async ({page}) => {
    //launch web
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");

    //get element using xpath
    const buttonRegis = page.locator("//input[@id='login']");
    const errorRequired = page.locator("(//div[@class='invalid-feedback'])[1]");

    //process 
    await buttonRegis.click();
    await errorRequired.waitFor();
    await page.screenshot({path: "screenshot/registration/regist with empty input.png"});
});

/** TC-Regis-001 : Registration using valid input */
test ("Registration using valid input", async ({page}) => {
    //launch web 
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");

    //get element using xpath
    const firstName = page.locator("//input[@id='firstName']");
    const lastName = page.locator("//input[@id='lastName']");
    const email = page.locator("//input[@id='userEmail']");
    const phoneNumber = page.locator("//input[@id='userMobile']");
    const occupation = page.locator("//select[@formcontrolname='occupation']");
    const genderFemale = page.locator("//input[@value='Male']");
    const password = page.locator("//input[@id='userPassword']");
    const confirmPassword = page.locator("//input[@id='confirmPassword']");
    const checkbox = page.locator("//input[@type='checkbox']");
    const buttonRegis = page.locator("//input[@id='login']");
    const successMsg = page.locator("//h1[normalize-space(.)='Account Created Successfully']");

    //process
    await firstName.fill("Testing");
    await lastName.fill("on Test");
    await email.fill("oktav1@gmail.com");
    await phoneNumber.fill("1234567890");
    //select by value
    await occupation.selectOption("2: Student");
    //use this for checkbox or radio botton
    await expect(genderFemale).toBeChecked();
    await password.fill("Testing12345@");
    await confirmPassword.fill("Testing12345@");
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await buttonRegis.click();
    await successMsg.waitFor();
    await page.screenshot({path: "screenshot/registration/regis_sukses.png"});
});