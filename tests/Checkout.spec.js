import {expect, test} from '@playwright/test'
import { text } from 'stream/consumers';

/** TC-CO-001 : User Can Successfully Checkout and Place an Order */
test("User Can Successfully Checkout and Place an Order", async ({page}) => {
    //launch web
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    //Locators Login
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const btnLogin = page.locator("//input[@id='login']");

    //Locators Dashboard
    const titleProduct = page.locator(".card-body b");
    const buttonCard = page.locator("[routerlink*='cart']");
    const buttonAddToCart = page.locator("button:has-text('Add To Cart')");

    //Locator Cart and Checkout
    const buttonCheckout = page.getByRole("button", {name:"Checkout"});
    const buttonPlaceOrder = page.getByRole("button", {name:"Place Order"});
    const inputCVV = page.locator("div.title:has-text('CVV Code') + input");
    const inputNameonCard = page.locator("div.title:has-text('Name on Card') + input");
    const selectCountry = page.locator("[placeholder*='Country']");
    const dropdownCountry = page.locator(".ta-results");
    const thanksOrder = page.locator("h1.hero-primary:has-text('Thankyou for the order.')");
    const idCheckout = page.locator(".em-spacer-1 .ng-star-inserted");

    //process login
    await email.fill("oktav1@gmail.com");
    await password.fill("Testing12345@");
    await btnLogin.click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({path: "screenshot/checkout/dashboard.png"});

    const count = await titleProduct.count();
    for (let i=0; i<count; i++){
        //check if all content have a name Product
        const name = (await titleProduct.nth(i).textContent())?.trim();
        expect(name).not.toBe("");
        expect(name).toBeTruthy();
    }

    //add to card process
    await buttonAddToCart.first().click();
    await page.waitForLoadState('networkidle');
    await page.locator("label:has-text('1')").waitFor();
    await buttonCard.click();
    await page.locator("div li").first().waitFor();

    //checkout process
    await buttonCheckout.click();
    await buttonPlaceOrder.isVisible();
    await inputCVV.fill("12345");
    await inputNameonCard.fill("Oktavia Dwi");
    await selectCountry.pressSequentially("ind");
    await dropdownCountry.waitFor();

        //click dropdown Select Country
    const optionCount = await dropdownCountry.locator("button").count();
    for(let i=0; i<optionCount; i++){
        const text = await dropdownCountry.locator("button").nth(i).textContent();
        if( text.trim() === "India"){
            await dropdownCountry.locator("button").nth(i).click();
            break;
        }
    };

    //place order process
    await buttonPlaceOrder.click();
    await page.waitForLoadState('networkidle');
    await thanksOrder.waitFor();
    expect(thanksOrder).toBeVisible();
});