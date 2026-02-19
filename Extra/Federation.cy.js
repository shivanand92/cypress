/// <reference types="cypress" />

describe('Federation screen', () => {
  let credentials;
  let migrationData;

  before(() => {
    // Load login credentials
    cy.fixture('login').then(data => credentials = data);

    // ✅ Load migration data from ingestion/migration.json
    cy.fixture('ingestion/migration').then(data => migrationData = data);
  });

  it('Logs into Tantor and creates a new Migration using fixture data', () => {
    Cypress.on('uncaught:exception', () => false);

    // Login
    cy.visit(credentials.url, { failOnStatusCode: false });
    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Go to Connections
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);
    // Open dropdown and select connection type
    cy.get('select.w-44.text-slate-500').select(migrationData.connectionType);
    cy.wait(1000);


   

    // Go to Migration
    cy.get('a[href="/migration"]').click();


    // Click the first button (by class)
cy.get("button.p-2.text-gray-600.hover\\:text-gray-800.rounded-full.hover\\:bg-gray-100")
  .eq(0)
  .click();


// Click the "Run" button (by aria-label)
cy.get("button[aria-label='Run']").click();
// Function to reload and check for status
function waitForStatusChange(expectedText, maxRetries = 6) {
  let retries = 0;

  function reloadAndCheck() {
    cy.reload();
    cy.wait(2000); // small wait to allow page to load
    cy.contains(expectedText, { timeout: 5000 }).then($el => {
      if ($el.length > 0) {
        cy.log('Status matched: ' + expectedText);
        return;
      } else if (retries < maxRetries) {
        retries++;
        cy.log(`Retrying... Attempt ${retries}`);
        reloadAndCheck();
      } else {
        throw new Error(`Status "${expectedText}" not found after ${maxRetries} retries`);
      }
    });
  }

  reloadAndCheck();
}

// Usage
waitForStatusChange('Completed');  // or whatever text you're waiting for
cy.screenshot('completed successfully');


// Refresh and wait multiple times
// Navigate to /report
cy.get('a[href="/report"]').click();
cy.wait(1000);

// Click on first "See details"
cy.contains('button', 'See details').first().click();
cy.wait(1000);

// Click "Generate Report"
cy.contains('button', 'Generate Report').click();

// Select "Migration" from dropdown
cy.get('select.w-full.p-2\\.5.border.border-gray-400.rounded-lg.focus\\:outline-none.focus\\:border-\\[\\#8e78b7\\].focus\\:ring-1.focus\\:ring-\\[\\#8e78b7\\].appearance-none.bg-white')
  .select('Migration');
cy.wait(1000);

// Get today's date in MM/DD/YYYY format (07/22/2025 style)
const today = new Date();
const formattedDate = today.toISOString().split('T')[0]; // returns '2025-07-22'

// Fill Start Date
cy.get('input[type="date"]').eq(0).clear().type(formattedDate);

// Fill End Date
cy.get('input[type="date"]').eq(1).clear().type(formattedDate);

cy.wait(1000);

// Click "Create"
cy.contains('button', 'Create').click();
cy.wait(2000);

// Click export dropdown
cy.get('button.flex.items-center.px-4.py-2.border.border-gray-400.rounded-lg.hover\\:bg-\\[\\#8e78b7\\].hover\\:text-white.transition-colors').click();
cy.wait(1000);

// Select first dropdown item
cy.get('div.block.cursor-pointer.w-full.text-left.px-4.py-2.text-sm.text-gray-700.hover\\:bg-gray-100.hover\\:text-gray-900').first().click();
cy.wait(10000);

// Click "Cancel"
cy.contains('div', 'Cancel').click();
cy.wait(5000);

cy.get('a[href="/federation"]').click();
    cy.wait(1000);
 
    // Step 3: Click on the first 'flex justify-between' div
    //cy.get('(//div[@class="flex justify-between"])[1]').click();
    //cy.wait(1000);
// Scroll to the element before clicking
cy.get('div.flex.justify-between').first().scrollIntoView().should('be.visible').click();
cy.wait(1000);
 
    // Step 4: Focus ACE editor
    cy.get('div.ace_content').click();
 
    // Step 5: Type into the hidden textarea used by ACE editor
    cy.get('textarea.ace_text-input').type('Select * from Postgresforautomation.public.ingestion_source');
    cy.wait(1000);
    //cy.get('div.flex.justify-between.items-center').click({ force: true });
    cy.contains('button', 'Run').click({ force: true });
    cy.wait(1000);
    
    cy.screenshot('Quarry executed successfully');
    


    });
});
