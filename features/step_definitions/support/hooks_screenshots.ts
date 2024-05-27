import { Status, IWorld } from "@cucumber/cucumber"
import { getPlaywrightConfig } from "./hooks_config"
import { fixture } from "./fixture";
import path = require("path");
import messages from '@cucumber/messages';

export const attachScreenshot = async function attachScreenshot(theThis: IWorld<any>, pickle: messages.Pickle, nameSuffix: string, result?: messages.TestStepResult) {
    let playwrightConfig = await getPlaywrightConfig();

    if (!playwrightConfig?.use?.screenshot ||
        playwrightConfig?.use?.screenshot == "off") {
        return;
    }
    if (playwrightConfig?.use?.screenshot == "on") {
        await addScreenshot(theThis, playwrightConfig?.outputDir, pickle, nameSuffix);
        return;
    }
    if (playwrightConfig?.use?.screenshot == "only-on-failure") {
        if(result) {
            if (result?.status == Status.FAILED) {
                await addScreenshot(theThis, playwrightConfig?.outputDir, pickle, nameSuffix);
            }
        }
    }
}

async function addScreenshot(theThis: IWorld<any>, outputDir: string, pickle: messages.Pickle, nameSuffix: string) {
    let screenshotFileName = `screenshot_${nameSuffix}.png`;
    let filePath = path.join(outputDir, `${pickle.name}_${pickle.id}`, screenshotFileName);
    let screenshot = await fixture.page.screenshot({ path: filePath, type: "png", fullPage: false });

    // Report Portal version only - making troubles in cucumber default HTML reporter
    // theThis.attach(
    //     JSON.stringify({
    //         message: `Screenshot_${nameSuffix}`,
    //         level: 'DEBUG',
    //         data: screenshot.toString('base64'),
    //     }),
    //     'base64:image/png',
    // );

    // Default HTML reporter compatible version
    theThis.attach(
        screenshot, { mediaType: "image/png", fileName: screenshotFileName }
    );
}