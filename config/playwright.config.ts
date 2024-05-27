import { defineConfig, devices } from '@playwright/test';

/** More info: https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
 * Playwright config is processed different way then Playwright do it itself.
 * Processing is done in `features\step_definitions\support\hooks_config.ts`.
 * - Field `use.launchOptions` is used for start browser.
 * - Field `use` is used as a BrowserContextOptions. Some values are injected in Before hook in `features\step_definitions\support\hooks.ts`. For example video recording setup.
 * Simple inheritance/override was implemented. Selected project `project.use` add and override data in `use`. The overridden `use` is the main configuration in framework.
 */
export default defineConfig({
    outputDir: "./results/",
    use: {
        baseURL: "http://localhost:8099",
        launchOptions: {
            headless: true,
        },
        ignoreHTTPSErrors: true,
    },
    projects: [
        {
            name: 'Chromium',
            use: devices['Desktop Chrome'],
        },
        {
            name: 'Google Chrome',
            use: { ...devices['Desktop Chrome'], channel: 'chrome', headless: false },
        },
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'], channel: 'chrome' }
        },
        {
            name: 'Google Chrome FullHD',
            use: {
                ...devices['Desktop Chrome'], 
                browserName: "chromium",
                channel: 'chrome',
                headless: false,
                /** View port of Chrome 122 on Full HD screen, Windows 10 Pro 22H2 */
                viewport: {
                    width: 1920,
                    height: 953,
                },
                launchOptions: {
                    args: ['--start-maximized', '--window-size=1920,1080'], // --start-maximized start working when https://github.com/microsoft/playwright/issues/4046 is fixed
                },
                video: {
                    mode: "retain-on-failure",
                    // size: { width: 1920, height: 953 }
                },
                trace: "retain-on-failure",
                screenshot: "only-on-failure"
            }
        }
    ]
});
