import { LaunchOptions, chromium, firefox, webkit  } from "@playwright/test"
import { getPlaywrightConfig } from "./hooks_config";

export const startBrowser = async function startBrowser() {
    let playwrightConfig = await getPlaywrightConfig();
    let browserType = playwrightConfig?.use?.browserName || playwrightConfig?.use?.defaultBrowserType;
    let launchOptions = playwrightConfig?.use?.launchOptions;
    return launchBrowser(browserType, launchOptions);
}

export const launchBrowser = (browserType: String, launchOptions: LaunchOptions) => {
    switch (browserType) {
        case "chromium":
            return chromium.launch(launchOptions);
        case "firefox":
            return firefox.launch(launchOptions);
        case "webkit":
            return webkit.launch(launchOptions);
        default:
            throw new Error("Unknown browser!");
    }
}
