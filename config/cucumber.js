const path = require("path")
const config = require('./config.json');

let configTemplate = {
    tags: process.env.npm_config_TAGS || "",
    parallel: 2,
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
        ['html', `${path.join(config.pathToReports, "cucumber_report.html")}`],
        ['json', `${path.join(config.pathToReports, "cucumber_report.json")}`],
        "rerun:@rerun.txt"
    ],
    retry: 1
};

module.exports = {
    default: {
        ...configTemplate
    },
    rerun: {
        ...configTemplate,
        paths: [],
        format: [
            "./reportportal_formatter_rerun.js",
            ['html', `${path.join(config.pathToReports, "cucumber_report_rerun.html")}`],
            ['json', `${path.join(config.pathToReports, "cucumber_report_rerun.json")}`],
            "rerun:@rerun.txt"
        ],
        retry: 0
    },
    launch_file: {
        ...configTemplate,
        parallel: 4,
        paths: [],
        retry: 0
    },
    launch_file_no_reportportal: {
        ...configTemplate,
        parallel: 4,
        paths: [],
        format: [
            "summary",
            ['html', `${path.join(config.pathToReports, "cucumber_report.html")}`],
            ['json', `${path.join(config.pathToReports, "cucumber_report.json")}`],
            "rerun:@rerun.txt"
        ],
        retry: 0
    },
    cucumber_js_test_runner: {
        ...configTemplate,
        parallel: 4,
        paths: [],
        retry: 0
    }
}