const fs = require("fs-extra")
const path = require("path")
import config from "./config/config.json";
import playwrightConfig from "./config/playwright.config";

fs.ensureDirSync(config.pathToReports);
fs.emptyDirSync(config.pathToReports);
fs.writeFileSync(path.join(config.pathToReports, "/.gitkeep"), "");

fs.ensureDirSync(playwrightConfig?.outputDir);
fs.emptyDirSync(playwrightConfig?.outputDir);
fs.writeFileSync(path.join(playwrightConfig?.outputDir, "/.gitkeep"), "");
