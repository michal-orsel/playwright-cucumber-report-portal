import { Given, When, Then } from "@cucumber/cucumber"
import { fixture } from "../../support/fixture";
import { installSelectors } from "../../../selectors/install/install_form_selectors";

Given('I select language English', async function () {
    await fixture.page.locator(installSelectors.languageEnglishOption).click();
});

When('I click on language continue button', async function () {
    await fixture.page.locator(installSelectors.languageContinueButton).click();
});

Given('I fill site title {string}', async function (siteTitle) {
    await fixture.page.locator(installSelectors.siteTitleInput).fill(siteTitle);
});

Given('I fill install username {string}', async function (username) {
    await fixture.page.locator(installSelectors.usernameInput).fill(username);
});

Given('I fill install password {string}', async function (password) {
    await fixture.page.locator(installSelectors.passwordInput).fill(password);
});

Given('I confirm weak password', async function () {
    await fixture.page.locator(installSelectors.confirmWeakPasswordCheckbox).click();
});

Given('I fill install email {string}', async function (email) {
    await fixture.page.locator(installSelectors.emailInput).fill(email);
});

Given('I discourage search engines', async function () {
    await fixture.page.locator(installSelectors.searchEngineVisibilityCheckbox).click();
});

When('I click on install button', async function () {
    await fixture.page.locator(installSelectors.installButton).click();
});

Then('I see installation message {string}', async function (expected_message) {
    await fixture.expect(fixture.page.locator(installSelectors.successHeading)).toBeVisible();
    await fixture.expect(fixture.page.locator(installSelectors.successHeading)).toHaveText(expected_message);
});
