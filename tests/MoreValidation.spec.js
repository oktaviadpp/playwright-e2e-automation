import { expect,test } from "@playwright/test";

test ("More Validation Handle", async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Element Displayed Example
    const buttonHide = page.locator("#hide-textbox");
    const buttonShow = page.locator("#show-textbox");
    const displayedText = page.locator("#displayed-text");

    if(await displayedText.isVisible()){
        await buttonHide.click();
        console.log("successfully HIDE")
        
    }else{
        await buttonShow.click();
        console.log("successfully SHOW")
    }

    //Switch To Alert Example 
    const name = page.locator("#name");
    const confirm = page.locator("#confirmbtn");

    await name.fill("Oktavia");
    page.on('dialog', dialog => dialog.accept());
    await confirm.click();
    console.log("DIALOG ACCEPT")
});