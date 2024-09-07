import { Given, When, Then } from "@cucumber/cucumber"
import { fixture } from "../support/fixture";
import { getPlaywrightConfig } from "../support/hooks_config";

Given('I navigate to base url', async function () {
    let playwrightConfig = await getPlaywrightConfig();
    await fixture.page.goto(playwrightConfig.use.baseURL);
});

Given('I navigate to {string}', async function (url) {
    await fixture.page.goto(url);
});

Given('I navigate to relative url {string}', async function (relativeUrl) {
    let playwrightConfig = await getPlaywrightConfig();
    let url = new URL(relativeUrl, playwrightConfig.use.baseURL).href;
    this.info(`Login to report portal example - info. Url ${url}`);
    this.debug(`Login to report portal example - debug. Url ${url}`);
    this.error(`Login to report portal example - error. Url ${url}`);
    this.warn(`Login to report portal example - warn. Url ${url}`);
    this.trace(`Login to report portal example - trace Url ${url}`);
    this.fatal(`Login to report portal example - fatal Url ${url}`);
    await fixture.page.goto(url);
});
