import { test, expect } from '@playwright/test';

test('allows sign up and log in', async ({ page }) => {
    const testUser = 'test' + Date.now()
    await page.goto('/');
    await page.getByRole('link', { name: 'Sign Up' }).click();
    // await page.getByRole('textbox', { name: 'Username:' }).click();
    // await page.getByRole('textbox', { name: 'Username:' }).fill(testUser);
    await page.getByLabel('Username:').fill(testUser)
    // await page.getByRole('textbox', { name: 'Password:' }).click();
    // await page.getByRole('textbox', { name: 'Password:' }).fill(testUser);
    await page.getByLabel('Password:').fill(testUser)
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await page.waitForURL('**/login')
    // await page.getByRole('textbox', { name: 'Username:' }).click();
    // await page.getByRole('textbox', { name: 'Username:' }).fill(testUser);
    await page.getByLabel('Username:').fill(testUser)
    // await page.getByRole('textbox', { name: 'Password:' }).click();
    // await page.getByRole('textbox', { name: 'Password:' }).fill(testUser);
    await page.getByLabel('Password:').fill(testUser)
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.locator('nav')).toContainText('Logged in as ' + testUser);
/*
    Using toContainText instead of toHaveText ensures that the text does not have to be 
    exactly the provided string. In our case, the Logout text is also part of the <nav> element, so 
    the full text would be Logged in as testXXXXLogout.
*/
});