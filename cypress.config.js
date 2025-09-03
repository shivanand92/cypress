/*const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', //for html reports
  e2e: {
    
    
    setupNodeEvents(on, config) {
      screenshotOnRunFarequire('cypress-mochawesome-reporter/plugin')(on); // for htmlilure: true;
      
      // implement node event listeners here
    },
  },
});*/


/*const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', //for html reports
  e2e: {
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on); // for html reports
    },
  },
});*/


/*const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    screenshotOnRunFailure: true,
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Take screenshot after each test
      on('after:screenshot', (details) => {
        console.log('Screenshot taken:', details.path);
      });
      
      return config;
    },
  },
});*/

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: false,
  },
  e2e: {
    screenshotOnRunFailure: true,
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Take screenshot after each test
      on('after:screenshot', (details) => {
        console.log('Screenshot taken:', details.path);
      });
      
      return config;
    },
  },
});

