import { Status, IWorld } from "@cucumber/cucumber"
import { BrowserContextOptions } from "@playwright/test"
import { getPlaywrightConfig } from "./hooks_config"
import { fixture } from "./fixture";
import fs = require("fs");
import path = require("path");
import messages from '@cucumber/messages';

const DEFAULT_VIDEO_SIZE = { width: 800, height: 450 };

export const addVideoSettings = async function addVideoSettings(browserContextOptions: BrowserContextOptions, pickle: messages.Pickle) {
    let playwrightConfig = await getPlaywrightConfig();
    if (playwrightConfig?.use?.video?.mode) {
        if (playwrightConfig?.use?.video?.mode == "on" ||
            playwrightConfig?.use?.video?.mode == "retain-on-failure" ||
            playwrightConfig?.use?.video?.mode == "on-first-retry") {
            let folderPath = path.join(playwrightConfig?.outputDir, `${pickle.name}_${pickle.id}/`);
            browserContextOptions.recordVideo = {
                dir: folderPath,
                size: playwrightConfig?.use?.video?.size || DEFAULT_VIDEO_SIZE
            }
        }
    }
    return browserContextOptions;
}

/** Needs to be after page.close and context.close because video file is not properly saved earlier. */
export const attachVideo = async function attachVideo(theThis: IWorld<any>, result: messages.TestStepResult) {
    let playwrightConfig = await getPlaywrightConfig();

    if (!playwrightConfig?.use?.video?.mode ||
        playwrightConfig?.use?.video?.mode == "off") {
        return;
    }
    if (playwrightConfig?.use?.video?.mode == "on") {
        await addVideo(theThis);
        return;
    }
    if (playwrightConfig?.use?.video?.mode == "retain-on-failure" ||
        playwrightConfig?.use?.video?.mode == "on-first-retry") {
        if (result?.status == Status.FAILED) {
            await addVideo(theThis);
        }
    }
}

async function addVideo(theThis: IWorld<any>) {
    let videoPath = await fixture.page.video()?.path();
    if (videoPath) {
        // Report Portal version only - making troubles in default HTML reporter
        // theThis.attach(
        //     JSON.stringify({
        //         message: `Video`,
        //         level: 'DEBUG',
        //         data: fs.readFileSync(videoPath).toString('base64'),
        //     }),
        //     'base64:video/webm',
        // );

        // Default HTML reporter compatible version
        theThis.attach(
            fs.readFileSync(videoPath), { mediaType: "video/webm", fileName: "Video.webm" }
        );
    }
}
