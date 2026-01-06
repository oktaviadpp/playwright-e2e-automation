const { expect } = require('@playwright/test');

class APIUtils {

    // Constructor untuk inject API context & payload login
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    // Login via API untuk ambil token
    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );

        // Pastikan response login sukses
        expect(loginResponse.ok()).toBeTruthy();

        // Ambil token dari response
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }

    // Create order via API menggunakan token
    async createOrder(token, orderPayLoad) {
        const createOrder = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Ambil orderId dari response
        const createOrderResponseJson = await createOrder.json();
        return createOrderResponseJson.orders[0];
    }
}

module.exports = { APIUtils };
