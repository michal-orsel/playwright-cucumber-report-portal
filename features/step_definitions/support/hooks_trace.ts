import { Status, IWorld } from "@cucumber/cucumber"
import { BrowserContext } from "@playwright/test"
import { getPlaywrightConfig } from "./hooks_config"
import fs = require("fs");
import path = require("path");
import messages from '@cucumber/messages';

export const startTracing = async function startTracing(browserContext: BrowserContext) {
    let playwrightConfig = await getPlaywrightConfig();
    if (playwrightConfig?.use?.trace) {
        if (playwrightConfig?.use?.trace != "off") {
            await browserContext.tracing.start({ screenshots: true, snapshots: true });
        }
    }
    return browserContext;
}

export const attachTrace = async function attachTrace(theThis: IWorld<any>, browserContext: BrowserContext, pickle: messages.Pickle, result: messages.TestStepResult) {
    let playwrightConfig = await getPlaywrightConfig();

    if (!playwrightConfig?.use?.trace ||
        playwrightConfig?.use?.trace == "off") {
        return;
    }
    if (playwrightConfig?.use?.trace == "on") {
        await addTrace(theThis, playwrightConfig?.outputDir, browserContext, pickle);
        return;
    }
    if (playwrightConfig?.use?.trace == "retain-on-failure" ||
        playwrightConfig?.use?.trace == "on-first-retry" ||
        playwrightConfig?.use?.trace == "on-all-retries") {
        if (result?.status == Status.FAILED) {
            await addTrace(theThis, playwrightConfig?.outputDir, browserContext, pickle);
        }
    }
}

async function addTrace(theThis: IWorld<any>, outputDir: string, browserContext: BrowserContext, pickle: messages.Pickle) {
    let traceFileName = `trace_${pickle.astNodeIds}.zip`;
    let filePath = path.join(outputDir, `${pickle.name}_${pickle.id}`, traceFileName);
    await browserContext.tracing.stop({ path: filePath });

    // Report Portal version only - making troubles in cucumber default HTML reporter
    // theThis.attach(
    //     JSON.stringify({
    //         message: `Playwright Trace file. Use command:<br />npx playwright show-trace path/to/trace.zip<br /><br />Doc: https://playwright.dev/docs/trace-viewer`,
    //         level: 'DEBUG',
    //         data: fs.readFileSync(filePath).toString('base64'),
    //     }),
    //     'application/zip',
    // );

    // Default HTML reporter compatible version
    theThis.attach(
        fs.readFileSync(filePath), { mediaType: "application/zip", fileName: traceFileName }
    );
    theThis.attach(
        `For Playwright Trace file use command:
npx playwright show-trace path/to/trace.zip
For example:
npx playwright show-trace "${path.resolve(filePath)}"
Doc: https://playwright.dev/docs/trace-viewer`
    );
}
