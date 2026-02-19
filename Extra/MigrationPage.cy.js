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

    cy.get('button[aria-label="Open actions menu"]').eq(0).click();
cy.wait(1000);

// Click the "Edit" button
cy.get('button[aria-label="Edit"]').click();
//cy.wait(1000);

// Click the "Delete" button
/*cy.get('button[aria-label="Delete"]').click();
cy.wait(1000);
cy.contains('button', 'Delete').click();
cy.screenshot('Deleted Successfully');*/



    });
});