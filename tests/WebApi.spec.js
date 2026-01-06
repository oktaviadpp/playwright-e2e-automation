const {expect, test,request} = require ('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {
    userEmail: "oktav1@gmail.com",
    userPassword: "Testing12345@"
}
let tokenLogin;
let orderId;

// Executed once before all tests
test.beforeAll(async ()=> {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    tokenLogin = await apiUtils.getToken();

    const orderPayLoad = {
        orders : [{
            country :  "Indonesia",
            productOrderedId : "68a961459320a140fe1ca57a"
        }]
    };
    orderId = await apiUtils.createOrder(tokenLogin, orderPayLoad);
    
});

// Executed before each test
test.beforeEach(()=> {

});

test("API create order → UI validate order", async ({ page }) => {

    const menuOrder = page.locator("button[routerlink*='myorders']");
    const titleOrder = page.locator("h1:has-text('Your Orders')");
    const rowsOrder = page.locator("tbody tr");

    //Inject token ke localStorage sebelum page load
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, tokenLogin);

    await page.goto("https://rahulshettyacademy.com/client/");
    await menuOrder.click();
    await titleOrder.waitFor();

    let isOrderFound = false;

    for (let i = 0; i < await rowsOrder.count(); i++) {
        const rowOrderId = await rowsOrder.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rowsOrder.nth(i).locator("button.btn-primary").click();
            isOrderFound = true;
            break;
        }
    }

    expect(isOrderFound).toBeTruthy();

    const orderIdDetailLocator = page.locator(".col-text");
    await orderIdDetailLocator.waitFor();
    const orderIdDetail = await orderIdDetailLocator.textContent();

    expect(orderId.includes(orderIdDetail)).toBeTruthy();
});