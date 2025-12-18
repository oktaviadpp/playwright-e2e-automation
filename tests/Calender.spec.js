import { expect,test } from "@playwright/test";

test("Calender", async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const dates = page.locator(".react-date-picker__inputGroup");
    const label_calendar = page.locator(".react-calendar__navigation__label__labelText");
    const month = page.locator(".react-calendar__year-view__months__month");

    await dates.click();
    await label_calendar.click();
    await label_calendar.click();
    await page.getByText("2027").click();
    await month.nth(5).click();
    await page.locator("//abbr[text()='"+date+"']").click();
});