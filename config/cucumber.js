const path = require("path")
const config = require('./config.json');

module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "",
        parallel: 1,
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "features/features"
        ],
        publishQuite: true,
        dryRun: false,
        require: [
            "features/*.ts",
            "features/**/*.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "./reportportal_formatter.js",
            // "progress-bar",
            ['html', `${path.join(config.pathToReports, "cucumber_report.html")}`],
            ['json', `${path.join(config.pathToReports, "cucumber_report.json")}`],
            "rerun:@rerun.txt"
        ],
        retry: 1
    },
    rerun: {
        parallel: 4,
        formatOptions: {
            snippetInterface: "async-await"
        },
        publishQuite: true,
        dryRun: false,
        require: [
            "features/*.ts",
            "features/**/*.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "./reportportal_formatter_rerun.js",
            // "progress-bar",
            ['html', `${path.join(config.pathToReports, "cucumber_report_rerun.html")}`],
            ['json', `${path.join(config.pathToReports, "cucumber_report_rerun.json")}`],
            "rerun:@rerun2.txt"
        ],
        retry: 1
    }
}