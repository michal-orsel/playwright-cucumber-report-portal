# Playwright Cucumber Report Portal

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE.txt)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22.17.1-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Report Portal](https://img.shields.io/badge/Report_Portal-5.15.0-00c7d4)](https://reportportal.io/)

---

## Automation solution
Basic automation solution for everyone who wants to use the modern testing framework [Playwright](https://playwright.dev/) and likes [Cucumber](https://cucumber.io/) tests. Results are continuously sent to [Report Portal](https://reportportal.io/). The Report Portal can be hosted locally. Thus the whole solution is free. Have fun. PS: Follow [best practice](https://playwright.dev/docs/best-practices).

Thanks to Koushik for making great [YouTube tutorials](https://www.youtube.com/watch?v=bfWXNLqKlvA&list=PL699Xf-_ilW6KgK-S1l9ynOnBGiZl2Bsk&index=1). This solution is based on it.

## Features
- ✔ **Playwright config** basic support.
- ✔ **Parallelization** tested on number 4.
- ✔ **Run in Visual Studio Code** via F5 or launch button in Debug view. Also, the `CucumberJS Test Runner` extension can be used (basic setup is done).
- ✔ **Screenshots** are captured after each step and at the end of the scenario.
- ✔ **Video** from test execution.
- ✔ **Trace** file. Playwright produces a test trace file. It is a zip file which can be used by the command:

    `npx playwright show-trace path/to/trace.zip`

    More info: https://playwright.dev/docs/trace-viewer

## How to use
#### Dev environment
 It is recommended to use [Visual Studio Code](https://code.visualstudio.com/) with the following extensions:
  - [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
  - [Cucumber](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official)

#### Prerequisites
- Install [Node.js](https://nodejs.org/) 
- Install packages using the command: `npm ci`
- Install Playwright: `npx playwright install`

#### Configuration
[Report Portal configuration](https://github.com/reportportal/agent-js-cucumber) needs to be set. At least the apiKey.
- Update `config/reportportal_config.json`

There are more places that can be configured, but not all are needed for the first run:
- config/config.json
- config/reportportal_config.json
- config/cucumber.js
- config/playwright.config.ts
- packages.json
- tsconfig.json

Everything is mixed together in the hooks files:
- features/step_definitions/support/hooks.ts

Some handy configuration examples:
- Profiles can be defined in `config/playwright.config.ts`. They should contain browsers (chromium, firefox, webkit) and their specific setup. Currently, this framework cannot run multiple profiles at once.
- To select which profile should be executed, configure it in `config/config.json`. It is also possible to select a profile via command line using an environment variable. An example is in `package.json` in the script `test-project-in-command-mobile-chrome`
- Parallelization is configured in `config/cucumber.js`
- Screenshots, video and trace files are configured in `config/playwright.config.ts`
- Failed scenarios are executed again automatically due to `retry` in `config/cucumber.js`. If they fail again, they are saved to @rerun.txt. It is possible to run them with the command `npm run test:rerun`

Note: Keep in mind that each config sets up different technology. Let me explain with an example: Screenshots can be enabled in `config/reportportal_config.json`, but if they are not enabled in `config/playwright.config.ts`, then Playwright does not take any screenshots. Thus, the Report Portal client does not have any screenshots to upload.

#### To run:
- To run all scenarios, use the command: `npm run test`
- To rerun failed scenarios use command: `npm run test:rerun`
- To run specific tests, use the command (example): `npm run tag-login:positive`
- To run a different profile than the one specified in `config/config.json`, use the example script `npm run test-project-in-command-mobile-chrome`

Note: Keep in mind that there is a cleaner that drops results and reports before each `npm run test` command and other scripts that execute it.

##### Run in debug Visual Studio Code

Scenarios can be run in Visual Studio Code in the Debug view or by pressing F5. Breakpoints can be used. There are a few configured options in `.vscode/launch.json`.
- Scenario on current line

  Default. Run scenario, feature or example data line on current line number.

- Feature

  Run currently open feature file.

- Rerun

  Run the rerun.txt file and set failures to the same file again. It does not matter what file is open.

- Scenario on current line (no Report Portal)
- Feature (no Report Portal)
- Rerun (no Report Portal)

##### Run via CucumberJS Test Runner extension
There is another option to run scenarios. Install the extension [CucumberJS Test Runner](https://marketplace.visualstudio.com/items?itemName=balrog994.cucumber-test-runner). Settings are predefined in `.vscode/settings.json`. It can be used in the Visual Studio Code Testing view. Or use the play buttons on the left side of an open feature file. This runner has some limitations:
- No way to report to Report Portal.
- The debugger is not always attached.
However, it could be useful for local runs.

#### Folder structure
Folder structure is based on [ReportPortal cucumber agent](https://github.com/reportportal/agent-js-cucumber) (aka Report Portal client). There are some modifications which help to organize big projects. However, there are also some technical limits. For example, the folder `support` cannot be moved out of the folder `step_definitions`:

    ├── config                             ←— config files
    ├── docker                             ←— system (Wordpress) under test and Report Portal docker yml files
    ├── features
    │   ├── features                       ←— test cases (Cucumber feature files)
    │   │   └──  test.feature
    │   ├── pom                            ←— page object model
    │   ├── selectors                      ←— selectors (css, xpath)
    │   │   └── selectors.ts
    │   └── step_definitions
    │       ├── steps                      ←— steps (Cucumber steps definitions files)
    │       │   └── steps.ts
    │       └── support                    ←— framework files
    │           ├── hooks.ts               ←— main framework file with before, before all, after and more hooks
    │           ├── fixture.ts             ←— page file
    │           └── world.ts               ←— Report Portal client world
    ├── reports                            ←— html and json reports (produced by Cucumber.js)
    ├── results                            ←— screenshots, videos, traces (produced by Playwright)
    └── package.json

#### Examples
Example tests are implemented to demonstrate functionality. Some scenarios fail. By default, screenshots, video, and trace files are attached to Report Portal only when a scenario fails (this can be changed in the configs).

Log statements are shown in `features/step_definitions/steps/browser_steps.ts`

#### Without Report Portal
Do you like this solution but Report Portal is not your cup of tea? Feel free to deactivate it by removing the formatter in `config/cucumber.js`. Remove the files `reportportal_formatter.js`, `reportportal_formatter_rerun.js`, and `config/reportportal_config.json`. Then uninstall the package `@reportportal/agent-js-cucumber`.

## Update packages
The following commands upgrade packages:

    npx npm-check-updates
    npm outdated
    npx ncu --upgrade
    npm install

If you see "NCU Real Time Weather is Running.", then run the following command and try upgrading again:

    npm install -g npm-check-updates

## Test stack

Docker images for Report Portal and WordPress are ready in the test-stack folder. The test stack uses a unified docker-compose.yml that includes both Report Portal and WordPress configurations.

[Docker](https://www.docker.com/) needs to be installed to set up the testing environment.

### Setup steps

For initial test stack setup, use the script `init_test_stack.sh` or `init_test_stack.bat`. Keep in mind that [Prerequisites](#prerequisites) need to be completed beforehand.

The manual steps are as follows:

1. Navigate to test-stack folder: `cd test-stack`
2. Start all services: `docker compose up -d`
3. Wait for services to start (ReportPortal may take a few minutes)
4. Navigate back to project root: `cd ..`
5. Run automation to get Report Portal api key: `npm run report-portal:setup-api-key`
6. Run automation to complete WordPress installation: `npm run tag-install` or install manually. WordPress should be set to English for user `test` with password `test` and email `test@example.com`

Access to:
- Report Portal at http://localhost:8080
- WordPress at http://localhost:8099

If you prefer to run services separately:
- Report Portal: `docker compose -f ./test-stack/report_portal/docker-compose.yaml up`
- WordPress: `docker compose -f ./test-stack/wordpress/docker-compose.yaml up`

## Sources
- https://www.youtube.com/watch?v=bfWXNLqKlvA&list=PL699Xf-_ilW6KgK-S1l9ynOnBGiZl2Bsk&index=1
- https://playwright.dev/
- https://cucumber.io/docs/installation/javascript/
- https://github.com/reportportal/agent-js-cucumber
- https://github.com/reportportal/reportportal-mcp-server
- https://github.com/docker/awesome-compose/tree/master/wordpress-mysql
- https://github.com/reportportal/reportportal/blob/master/docker-compose.yml

## Known issues
- Attachments with messages are correct in Report Portal but not correct in HTML reports. That is the reason why the current setup does not use them.
- Playwright config is processed in a different way than Playwright does it itself. Processing is done in `features/step_definitions/support/hooks_config.ts`.
  - Field `use.launchOptions` is used to start the browser.
  - Field `use` is used as a `BrowserContextOptions`. Some values are injected in Before hook in `features/step_definitions/support/hooks.ts`. For example video recording setup.
  - Simple inheritance was implemented. A `project.use` inherits data from `use`. 
  Full support is requested in ticket: https://github.com/microsoft/playwright/issues/11975
- Playwright cannot open browser full screen: https://github.com/microsoft/playwright/issues/4046 
- Setting up video recording to `on-first-retry` is the same as `retain-on-failure`. The reason is that there is no way to recognize if the current run is a retry or not.

---

## Boring things at the end
### Verified on
- Windows 10 Pro 22H2
- NodeJs 22.17.1
- Npm 10.9.2
- Docker Desktop version 28.3.2, build 578ccf6
- Docker Compose version v2.38.2-desktop.1
- Report Portal API Service: 5.15.0; Index Service: 5.15.0; Jobs Service: 5.15.0; Authorization Service: 5.15.0; Service UI: 5.15.0;
- WordPress 6.9
- Visual Studio Code 1.107.1 with extensions:
    - Cucumber v1.11.0
    - Playwright Test for VSCode v1.1.17

---

License: ISC
