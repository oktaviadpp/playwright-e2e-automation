import {test, expect} from '@playwright/test'

test('Validation Title', async ({page}) => {
    //launch web
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    //expected result
    await expect(page).toHaveTitle('OrangeHRM');
});