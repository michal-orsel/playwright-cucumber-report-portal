const { createRPFormatterClass } = require('@reportportal/agent-js-cucumber');
const config = require('./config/reportportal_config.json');

module.exports = createRPFormatterClass(config);
