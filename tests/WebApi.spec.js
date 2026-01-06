const {expect, test,request} = require ('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {
    userEmail: "oktav1@gmail.com",
    userPassword: "Testing12345@"
}
let tokenLogin;

// Executed once before all tests
test.beforeAll(async ()=> {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    tokenLogin = await apiUtils.getToken();
    
});

// Executed before each test
test.beforeEach(()=> {

});

test("E2E Order and Checkout", async ({page}) => {

    //Locators Dashboard
    const titleProduct = page.locator(".card-body b");
    const buttonCard = page.locator("[routerlink*='cart']");
    const buttonAddToCart = page.locator("button:has-text('Add To Cart')");

    //Locator Cart and Checkout
    const buttonCheckout = page.getByRole("button", {name:"Checkout"});
    const buttonPlaceOrder = page.locator("a.btnn:has-text('Place Order')");
    const inputCVV = page.locator("div.title:has-text('CVV Code') + input");
    const inputNameonCard = page.locator("div.title:has-text('Name on Card') + input");
    const selectCountry = page.locator("[placeholder*='Country']");
    const dropdownCountry = page.locator(".ta-results");
    const thanksOrder = page.locator("h1.hero-primary:has-text('Thankyou for the order.')");
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");

    //Locators Order
    const menuOrder = page.locator("button[routerlink*=myorders]");
    const titleOrder = page.locator("h1.ng-star-inserted:has-text('Your Orders')");
    const rowsOrder = page.locator("tbody tr");

    //process login using token
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, tokenLogin);

    await page.goto("https://rahulshettyacademy.com/client/");

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
    const textOrderId = await orderId.textContent();
    console.log("textOrderId",textOrderId);

    //view detail order Process
    await menuOrder.click();
    await titleOrder.waitFor();
    for(let i=0; i< await rowsOrder.count(); i++){
        const rowsOrderId = await rowsOrder.nth(i).locator("th").textContent();
        console.log("rowsOrderId",rowsOrderId)
        if(textOrderId.includes(rowsOrderId)){
            await rowsOrder.nth(i).locator("button.btn-primary").click();
            break;
        }
    }
    const orderIdDetail = await page.locator(".col-text").textContent();
    console.log("orderIdDetail",orderIdDetail)
    expect(textOrderId.includes(orderIdDetail)).toBeTruthy();
});