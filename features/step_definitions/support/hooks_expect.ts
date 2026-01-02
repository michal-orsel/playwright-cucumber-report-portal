import { expect } from "@playwright/test"
import { getPlaywrightExpectConfig } from "./hooks_config";

export async function getExpect() {
    const expectConfig = await getPlaywrightExpectConfig();
    return expect.configure(expectConfig);
}
