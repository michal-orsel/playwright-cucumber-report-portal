import { Given, When, Then } from "@cucumber/cucumber"
import { fixture } from "../../support/fixture";
import { reportPortalLoginSelectors, reportPortalNavigationSelectors, reportPortalProfileSelectors, reportPortalGenerateApiKeyModalSelectors } from "../../../selectors/report_portal/report_portal_login_selectors";
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const FIFTEEN_MINUTES_TIMEOUT = 15 * 60 * 1000;
const ONE_MINUTES_TIMEOUT = 1 * 60 * 1000;

Given('I wait for login page to load in report portal', { timeout: FIFTEEN_MINUTES_TIMEOUT }, async function () {
    for (let tryIndex = 0; tryIndex < 15; tryIndex++) {
        try {
            await fixture.page.locator(reportPortalLoginSelectors.usernameInput).waitFor({ state: 'visible', timeout: ONE_MINUTES_TIMEOUT });
            break;
        } catch (error) {
            await fixture.page.reload();
        }
    }
});

Given('I fill username {string} in report portal', async function (username) {
    await fixture.page.locator(reportPortalLoginSelectors.usernameInput).fill(username);
});

Given('I fill password {string} in report portal', async function (password) {
    await fixture.page.locator(reportPortalLoginSelectors.passwordInput).fill(password);
});

When('I click on login button in report portal', async function () {
    await fixture.page.locator(reportPortalLoginSelectors.loginButton).click();
});

When('I click on user avatar in report portal', async function () {
    await fixture.page.locator(reportPortalNavigationSelectors.userAvatar).click();
});

When('I click on menu item {string} in report portal', async function (itemText) {
    await fixture.page.locator(reportPortalNavigationSelectors.menuitem).getByText(itemText).click();
});

When('I click on navigation tab link {string} in report portal', async function (itemText) {
    await fixture.page.locator(reportPortalProfileSelectors.navigationTabLink).getByText(itemText).click();
});

When('I click on generate API key button in report portal', async function () {
    await fixture.page.getByText("Generate API Key").click();
});

When('I fill API key name {string} in report portal', async function (keyName) {
    keyName = keyName + crypto.randomUUID();
    await fixture.page.locator(reportPortalProfileSelectors.apiKeyNameInput).fill(keyName);
});

When('I click on generate button in modal in report portal', async function () {
    await fixture.page.locator(reportPortalProfileSelectors.generateButtonInModal).click();
});

Then('I see generated API key in report portal', async function () {
    await fixture.page.locator(reportPortalGenerateApiKeyModalSelectors.loaderBlock).first().waitFor({ state: 'hidden' });
    const apiKey = await fixture.page.locator(reportPortalGenerateApiKeyModalSelectors.generatedKeyInput).inputValue();
    if (!apiKey) {
        throw new Error('API key not found');
    }
});

Then('I save the API key to report portal config', async function () {
    const apiKey = await fixture.page.locator(reportPortalGenerateApiKeyModalSelectors.generatedKeyInput).inputValue();

    const filePath = path.join(process.cwd(), 'config', "reportportal_config.json");
    const configContent = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(configContent);
    config.apiKey = apiKey;
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2), 'utf8');

    this.info(`API key updated in: ${filePath}`);
    this.info(`New key: ${apiKey}`);
});

Then('I save the API key to mcp config', async function () {
    const apiKey = await fixture.page.locator(reportPortalGenerateApiKeyModalSelectors.generatedKeyInput).inputValue();

    const mcpFilePath = path.join(process.cwd(), '.vscode', 'mcp.json');
    const mcpContent = fs.readFileSync(mcpFilePath, 'utf8');
    const mcpConfig = JSON.parse(mcpContent);
    mcpConfig.servers.reportportal.env.RP_API_TOKEN = apiKey;
    fs.writeFileSync(mcpFilePath, JSON.stringify(mcpConfig, null, 2), 'utf8');

    this.info(`API token updated in: ${mcpFilePath}`);
    this.info(`New token: ${apiKey}`);
});
