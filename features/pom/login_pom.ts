import { expect, type Locator, type Page } from '@playwright/test';
import { loginFormSelectors } from "../selectors/login/login_form_selectors";
import { getPlaywrightConfig } from "../step_definitions/support/hooks_config";

export class LoginPom {
    readonly page: Page;
    readonly getLoginForm: Locator;
    readonly getLoginErrorMessage: Locator;
    readonly getUsernameInput: Locator;
    readonly getPasswordInput: Locator;
    readonly getLoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getLoginForm = page.locator(loginFormSelectors.loginForm);
        this.getUsernameInput = page.locator(loginFormSelectors.usernameInput);
        this.getPasswordInput = page.locator(loginFormSelectors.passwordInput);
        this.getLoginErrorMessage = page.locator(loginFormSelectors.loginErrorMessage);
        this.getLoginButton = page.locator(loginFormSelectors.loginButton);
    }

    async goto() {
        let playwrightConfig = await getPlaywrightConfig();
        let url = new URL("/wp-admin", playwrightConfig.use.baseURL).href;
        await this.page.goto(url);
    }

    async getStarted() {
        await expect(this.getLoginForm).toBeVisible();
    }

    async login({ username, password }) {
        await this.getUsernameInput.fill(username);
        await this.getPasswordInput.fill(password);
        await this.getLoginButton.click();
    }

    async noLoginErrorsPresent() {
        await expect(this.getLoginErrorMessage).not.toBeVisible();
    }

    async pageObjectModel() {
        await this.getStarted();
    }
}