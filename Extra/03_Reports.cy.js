/// <reference types="cypress" />

import loginData from '../../fixtures/Usermodule/login.json';

describe('Create Migration using all conditios', () => {
  it('Logs into Tantor portal and creates migration', () => {

    // Load migration JSON + conditions JSON together
    cy.fixture('ingestion/Migration.json').then((migrationData) => {
    cy.fixture('ingestion/Migrationcondition.json').then((conditions) => {

      //-----------------------------------------
      // LOGIN
      //-----------------------------------------
      cy.visit(loginData.URL);

      cy.origin(loginData.KEYCLOAK_URL, { args: loginData }, ({ username, password }) => {
        cy.get('#username', { timeout: 20000 }).should('be.visible').type(username);
        cy.get('#password').should('be.visible').type(password);
        cy.get('input[value="Sign In"]').click();
      });

      //-----------------------------------------
      // NAVIGATE TO CONNECTIONS
      //-----------------------------------------
      cy.get('a[href="/connections"]').click();
      cy.wait(1000);

      cy.get('select.w-44.text-slate-500')
        .select(migrationData.connectionType);
      cy.wait(1000);

      //-----------------------------------------
      // OPEN MIGRATION PAGE
      //-----------------------------------------
      cy.get('a[href="/migration"]').click();
      cy.wait(1000);



      // Click the ellipsis icon from the row where status is "Ready to Run"
cy.contains('tr', 'Ready to Run')
  .find('button[aria-label="Open actions menu"]')
  .click();
cy.wait(1000);

  cy.get('button[aria-label="Run"]').click();


  cy.wait(50000);
 cy.reload(true);
 cy.wait(2000);


      });
});
});
});
