'use strict';

var e2epath = 'e2e';

exports.config = {
  seleniumPort: 4444,
  baseUrl: 'http://localhost:9000',
  getPageTimeout: 15000,
  allScriptsTimeout: 40000,

  framework: 'jasmine2',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  specs: [e2epath + '/**/*.spec.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 40000
  }
};
