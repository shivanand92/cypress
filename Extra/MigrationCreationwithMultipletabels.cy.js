/// <reference types="cypress" />

describe('Create Migration with Multiple Datasets', () => {
  let credentials;
  let migrationData;

  before(() => {
    // Load login credentials
    cy.fixture('login').then(data => credentials = data);

    // Load migration data from ingestion/migration.json
    cy.fixture('ingestion/migration').then(data => migrationData = data);
  });

  it('Logs in and creates a new migration with multiple datasets', () => {
    Cypress.on('uncaught:exception', () => false);

    // Login
    cy.visit(credentials.url, { failOnStatusCode: false });
    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Navigate to Connections and select connection type
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);
    cy.get('select.w-44.text-slate-500').select(migrationData.connectionType);
    cy.wait(1000);

    // Navigate to Migration
    cy.get('a[href="/migration"]').click();
    cy.wait(2000);
    cy.contains('button', 'Create Migration').click();

    // Source connection
    cy.get('span.text-gray-800.text-lg.font-bold').click();
    cy.get('div.px-3.py-2.hover\\:bg-gray-100.cursor-pointer.text-sm.text-gray-800').first().click();
    cy.wait(1000);

    // Select source connection and schema
    cy.get('div.flex.items-center.gap-1.ml-2').eq(0).click();
    cy.get('input[placeholder="Select Connection"]').eq(0).type(migrationData.sourceConnection);
    cy.get('div.bg-purple-50.text-purple-600').click();
    cy.get('div.flex.items-center.gap-1.ml-2').eq(1).click();
    cy.get('input[placeholder="Select Schema"]').eq(0).type(migrationData.sourceSchema);
    cy.contains('div', migrationData.sourceSchema).click();

    // Ingestion type
    cy.get('input[value="bulk"]').click();
    cy.wait(1000);

    // Select multiple datasets
    cy.get('div.flex.items-center.gap-1.cursor-pointer').click();
    cy.wait(1000);

    migrationData.datasets.forEach((dataset) => {
      cy.get('input[placeholder="Search datasets..."]').clear().type(dataset);
      cy.wait(1000);
      cy.get('input[type="checkbox"]').eq(1).click();
      cy.wait(1000);
    });

    // Target connection
    cy.get('div.flex.items-center.gap-1.ml-2').eq(2).click();
    cy.get('input[placeholder="Select Connection"]').eq(1).type(migrationData.targetConnection);
    cy.get('div.bg-purple-50.text-purple-600').click();

    // Target schema
    cy.get('div.flex.items-center.gap-1.ml-2').eq(3).click();
    cy.get('input[placeholder="Select Schema"]').eq(1).type(migrationData.targetSchema);
    cy.contains('div', migrationData.targetSchema).click();

    // Final checkbox
    cy.get('input[id="target-0-0"]').click();

    cy.get('input#target-1-0').scrollIntoView().click();
     cy.wait(1000);
    // Click SAVE and confirm
    cy.contains('button', 'SAVE').click();
    cy.wait(1000);
    cy.contains('button', 'Yes').click();
    cy.wait(1000);

    // Screenshot and success confirmation
    cy.screenshot('Migration_created_successfully');
    cy.contains('h2', 'Success!').should('be.visible');
    cy.contains('p', 'saved successfully').should('be.visible');
    cy.contains('button', 'Alright').click();
     cy.wait(2000);
     cy.screenshot('Migration_created_successfully');
  });
});
