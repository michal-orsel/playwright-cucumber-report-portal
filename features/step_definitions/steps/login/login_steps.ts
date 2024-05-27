import { Given, When, Then } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { fixture } from "../../support/fixture";
import { loginFormSelectors } from "../../../selectors/login/login_form_selectors";

Given('I fill username {string}', async function (username) {
    await fixture.page.locator(loginFormSelectors.usernameInput).fill(username);
});

Given('I fill password {string}', async function (password) {
    await fixture.page.locator(loginFormSelectors.passwordInput).click();
    await fixture.page.locator(loginFormSelectors.passwordInput).fill(password);
});

When('I click on login button', async function () {
    await fixture.page.locator(loginFormSelectors.loginButton).click();
});

Then('I see login form', async function () {
    await fixture.page.locator(loginFormSelectors.loginForm).isVisible();
});

Then('I see login error message {string}', async function (expected_error_message) {
    await expect(fixture.page.locator(loginFormSelectors.loginErrorMessage)).toBeVisible();
    this.debug("Login error message: " + await fixture.page.locator(loginFormSelectors.loginErrorMessage).textContent());
    await expect(fixture.page.locator(loginFormSelectors.loginErrorMessage)).toHaveText(expected_error_message)
});