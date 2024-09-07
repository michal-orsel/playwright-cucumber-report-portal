import { BeforeAll, AfterAll, Before, After, AfterStep, setDefaultTimeout } from "@cucumber/cucumber"
import { Browser, BrowserContext, BrowserContextOptions } from "@playwright/test"
import { fixture } from "./fixture";
import { getPlaywrightConfig } from "./hooks_config";
import { startBrowser } from "./hooks_browser";
import { attachScreenshot } from "./hooks_screenshots";
import { addVideoSettings, attachVideo } from "./hooks_video";
import { startTracing, attachTrace } from "./hooks_trace";
import config from "../../../config/config.json";

let browser: Browser;
let browserContext: BrowserContext;
let stepNumber: number;

BeforeAll(async function () {
    browser = await startBrowser();
});

Before(async function ({ pickle }) {
    stepNumber = 1;
    setDefaultTimeout(config.defaultTimeout);

    let browserContextOptions = {} as BrowserContextOptions;
    browserContextOptions = await getPlaywrightConfig();
    browserContextOptions = await addVideoSettings(browserContextOptions, pickle);
    browserContext = await browser.newContext(browserContextOptions);
    browserContext = await startTracing(browserContext);
    fixture.page = await browserContext.newPage();
});

AfterStep(async function ({ pickle }) {
    await attachScreenshot(this, pickle, String(stepNumber).padStart(2, '0'))
    stepNumber++;
});

After(async function ({ pickle, result }) {
    await attachScreenshot(this, pickle, "final", result);
    await attachTrace(this, browserContext, pickle, result);

    await fixture.page.close();
    await browserContext.close();

    await attachVideo(this, result);
});

AfterAll(async function () {
    await browser.close();
});
