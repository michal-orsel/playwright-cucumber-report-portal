# Playwright Cucumber Report Portal

# Automation solution
Basic automation solution for everyone who wants to use modern testing framework [Playwright](https://playwright.dev/) and like [Cucumber](https://cucumber.io/) tests. Results are continuously sent into [Report Portal](https://reportportal.io/). The Report Portal could be hosted locally. Thus whole solution is free. Have fun. PS: Follow [best practice](https://playwright.dev/docs/best-practices).

Thanks Koushik to make nice [YouTube tutorials](https://www.youtube.com/watch?v=bfWXNLqKlvA&list=PL699Xf-_ilW6KgK-S1l9ynOnBGiZl2Bsk&index=1). This solution is based on it.

## Features
- ✔ **Playwright config** basic support.
- ✔ **Parallelization** tested on number 4.
- ✔ **Run in Visual Studio Code** via F5 or launch button in Debug view. Also `CucumberJS Test Runner` extension could be used (basic setup is done).
- ✔ **Screenshots** are captured after each step and at the end of scenario.
- ✔ **Video** from test execution.
- ✔ **Trace** file. Playwright produce test Trace file. It is zip file which could be used by command:

    `npx playwright show-trace path/to/trace.zip`

    More info: https://playwright.dev/docs/trace-viewer

# How to use
## Dev environment
 Recommended to use [Visual Studio Code](https://code.visualstudio.com/) with extensions:
  - [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
  - [Cucumber](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official)

### Prerequisites
- Install [Node.js](https://nodejs.org/) 
- Download packages by command: `npm ci`

### Configuration
[Report Portal configuration](https://github.com/reportportal/agent-js-cucumber) needs to be set. At least apiKey.
- Update `config/reportportal_config.json`

There are more places what could be configured but not all are needed for the first run:
- config/config.json
- config/reportportal_config.json
- config/cucumber.js
- config/playwright.config.ts
- packages.json
- tsconfig.json

Everything is mixed together in hooks files:
- features/step_definitions/support/hooks.ts

Some handy configuration examples:
- Profiles could be defined in `config/playwright.config.ts`. They should contains Browsers (chromium, firefox, webkit) and their specific setup. Currently this framework cannot run more profiles at once.
- To select what profile should be executed is set in `config/config.json`. There is also possible to select profile in command via environment variable. Example is in `package.json` in script `test-project-in-command-mobile-chrome`
- Parallelization is configured in `config/cucumber.js`
- Screenshots, video and trace files are configured in `config/playwright.config.ts`
- Failed scenarios are executed again automatically due to `retry` in `config/cucumber.js`. If they fail again then they are set in @rerun.txt. And it is possible run by command `npm run test:rerun`

Note: Keep in mind that each config setup different technology. Let me explain it on example: Screenshots could be enabled in `config/reportportal_config.json` but if they are not enabled in `config/playwright.config.ts` then Playwright do not take any screenshot. Thus Report Portal client does not have any screenshot to upload.

### To run:
- All scenarios use command: `npm run test`
- To rerun failed scenarios use command: `npm run test:rerun`
- To run specific tests use command (just example): `npm run tag-login:positive`
- To run different profile then the one what is specified in `config/config.json` use example script `npm run test-project-in-command-mobile-chrome`

Note: Keep in mind that there is a cleaner which drop results and reports before each command `npm run test` and other scripts what execute it.

#### Run in debug Visual Studio Code

Scenarios could be run in Visual Studio Code in Debug view or by F5. Breakpoints could be used. There are configured few options in `.vscode/launch.json`.
- Scenario on current line

  Default. Run scenario, feature or example data line on current line number.

- Feature

  Run currently open feature file.

- Rerun

  Run rerun.txt file and set failures to the same file again. Does not matter what file is open.

- Scenario on current line (no Report Portal)
- Feature (no Report Portal)
- Rerun (no Report Portal)

#### Run via CucumberJS Test Runner extension
There is another option to run scenarios. Install extension [CucumberJS Test Runner](https://marketplace.visualstudio.com/items?itemName=balrog994.cucumber-test-runner). Settings is predefine in `.vscode/settings.json`. It could be used in Visual Studio Code Testing view. Or use play buttons on the left side of open feature file. This runner has some limitations:
- No way report to Report Portal.
- Debugger is not always attached.
But could be useful for local runs.

### Folder structure
Folder structure is based on [ReportPortal cucumber agent](https://github.com/reportportal/agent-js-cucumber) (aka Report Portal client). There are some modifications which help to organize big projects. However there are also some technical limits. For example folder `support` cannot be moved out of folder `step_definitions`:

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

### Examples
There were implemented example tests to demonstrate functionality. Some scenarios fails. By default screenshots, video and Trace file are attached to Report Portal only when scenario fails (could be changed in configs).

Log statements are shown in `features/step_definitions/steps/browser_steps.ts`

### Without Report Portal
Do you like this solution but Report Portal is not your cup of tea? Feel free deactivate it by removing formatter in `config/cucumber.js`. Remove files `reportportal_formatter.js`, `reportportal_formatter_rerun.js` and `config/reportportal_config.json`. And uninstall package `@reportportal/agent-js-cucumber`.

# Sources
- https://www.youtube.com/watch?v=bfWXNLqKlvA&list=PL699Xf-_ilW6KgK-S1l9ynOnBGiZl2Bsk&index=1
- https://playwright.dev/
- https://cucumber.io/docs/installation/javascript/
- https://github.com/reportportal/agent-js-cucumber
- https://github.com/docker/awesome-compose/tree/master/wordpress-mysql


# Known issues
- Attachments with messages are correct in Report Portal but not correct in HTML reports. That is reason why current setup does not use them.
- Due to https://github.com/reportportal/agent-js-cucumber/issues/155 issue it is not possible to update to cucumber version 10 at this moment.
- Playwright config is processed different way then Playwright do it itself. Processing is done in `features\step_definitions\support\hooks_config.ts`.
  - Field `use.launchOptions` is used for start browser.
  - Field `use` is used as a `BrowserContextOptions`. Some values are injected in Before hook in `features\step_definitions\support\hooks.ts`. For example video recording setup.
  - Simple inheritance was implemented. A `project.use` inherits data from `use`. 
  Full support is requested in ticket: https://github.com/microsoft/playwright/issues/11975
- Playwright cannot open browser full screen: https://github.com/microsoft/playwright/issues/4046 
- Setup video recording to `on-first-retry` is the same like `retain-on-failure`. Reason is that there is no way how to recognize if current run is retry or not.

---

# Boring things at the end
### Verified on
- Windows 10 Pro 22H2
- NodeJs 20.11.0
- Npm 10.4.0
- Docker Desktop version 24.0.7, build afdd53b
- Docker Compose version v2.23.3-desktop.2
- Report Portal API Service: 5.10.1; Index Service: 5.10.0; Jobs Service: 5.10.0; Authorization Service: 5.10.0; Service UI: 5.10.0;
- WordPress 6.4.3
- Visual Studio Code 1.86.0 with extensions:
    - Cucumber v1.8.1
    - Playwright Test for VSCode v1.0.21

## My testing setup
[Docker](https://www.docker.com/) needs to be installed to setup testing environment.

#### Report Portal
My [Report Portal](https://reportportal.io/) is running locally in [Docker](https://www.docker.com/)

To run use command: 
`docker compose -f .\docker\report_portal\docker-compose.yml up`

Running http://localhost:8080/
Default username: `superadmin` and password `erebus`

Docker compose file source: https://github.com/reportportal/reportportal/blob/master/docker-compose.yml

Results are available on http://localhost:8080/ui/#superadmin_personal/launches/all

#### WordPress
System under test. Running in [Docker](https://www.docker.com/).

To run use command: `docker compose -f .\docker\wordpress\docker-compose.yaml up`

Running http://localhost:8099/
Tests expect that Wordpress is installed in English for user `test` with password `test` and email `test@example.com`.

Docker compose file source: https://github.com/docker/awesome-compose/tree/master/wordpress-mysql

---

Keywords: Node.js, Playwright, Cucumber, Gherkin, BDD, Report Portal, JavaScript, TypeScript

License: ISC
