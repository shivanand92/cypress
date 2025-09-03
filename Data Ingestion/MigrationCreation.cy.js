/// <reference types="cypress" />

describe('Create Migration ', () => {
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
    cy.wait(2000);
    cy.contains('button', 'Create Migration').click();

    // Select source connection
    cy.get('span.text-gray-800.text-lg.font-bold').click();
    cy.get('div.px-3.py-2.hover\\:bg-gray-100.cursor-pointer.text-sm.text-gray-800').first().click();
    cy.wait(2000);

    // Select schema
    cy.get('div.flex.items-center.gap-1.ml-2').eq(0).click();
    cy.wait(1000);
    cy.get('input[placeholder="Select Connection"]').eq(0).type(migrationData.sourceConnection);
    cy.wait(1000);
    cy.get('div.bg-purple-50.text-purple-600').click();
    cy.wait(1000);
    cy.get('div.flex.items-center.gap-1.ml-2').eq(1).click();
    cy.wait(1000);
    cy.get('input[placeholder="Select Schema"]').eq(0).type(migrationData.sourceSchema);
    cy.wait(1000);
    cy.contains('div', migrationData.sourceSchema).click();
    cy.wait(1000);

    // Select ingestion type
    cy.get('input[value="bulk"]').click();
    cy.wait(1000);

    // Select dataset
    cy.get('div.flex.items-center.gap-1.cursor-pointer').click();
    cy.wait(1000);
    cy.get('input[placeholder="Search datasets..."]').type(migrationData.datasetName1);
    cy.get('input[type="checkbox"]').eq(1).click();
    cy.wait(1000);

    // Target connection
    cy.get('div.flex.items-center.gap-1.ml-2').eq(2).click();
    cy.wait(1000);
    cy.get('input[placeholder="Select Connection"]').eq(1).type(migrationData.targetConnection);
    cy.wait(1000);
    cy.get('div.bg-purple-50.text-purple-600').click();
    cy.wait(1000);

    // Target schema
    cy.get('div.flex.items-center.gap-1.ml-2').eq(3).click();
    cy.wait(1000);
    cy.get('input[placeholder="Select Schema"]').eq(1).type(migrationData.targetSchema);
    cy.wait(1000);
    cy.contains('div', migrationData.targetSchema).click();
    cy.wait(1000);

    // Final checkbox
    cy.get('input[id="target-0-0"]').click();
    cy.wait(1000);
    // Click Save
    cy.contains('button', 'SAVE').click();
   cy.wait(1000);

    cy.contains('button', 'Yes').click();
     cy.wait(1000);
    cy.screenshot('Migration  created Successfully');

    // Validate success popup
    cy.contains('h2', 'Success!').should('be.visible');
    cy.contains('p', 'saved successfully').should('be.visible');
     cy.wait(1000);
    cy.contains('button', 'Alright').click();

   
    
  
});
});
