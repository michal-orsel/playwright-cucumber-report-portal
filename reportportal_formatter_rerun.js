const { createRPFormatterClass } = require('@reportportal/agent-js-cucumber');
const config = require('./config/reportportal_config.json');

config.rerun = true;
module.exports = createRPFormatterClass(config);
