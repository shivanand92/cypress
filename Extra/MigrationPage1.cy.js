/// <reference types="cypress" />

import loginData from '../../fixtures/login.json';

describe('Edit Migration', () => {
  it('Logs into Tantor portal and creates migration', () => {

    // Load Migration JSON
    cy.fixture('ingestion/Migration.json').then((migrationData) => {

      // Visit Tantor portal
      cy.visit(loginData.URL);

      // Keycloak login
      cy.origin(loginData.KEYCLOAK_URL, { args: loginData }, ({ username, password }) => {
        cy.get('#username', { timeout: 20000 }).should('be.visible').type(username);
        cy.get('#password').should('be.visible').type(password);
        cy.get('input[value="Sign In"]').click();
      });


       cy.get('a[href="/connections"]').click();
      cy.wait(1000);

      // Select connection type
      cy.get('select.w-44.text-slate-500')
        .select(migrationData.connectionType);
      cy.wait(1000);
      //-------------------------------------------
      // Navigate to Migration Page
      //-------------------------------------------
      cy.get('a[href="/migration"]').click();
      cy.wait(1000);


     cy.contains('.font-semibold', 'Oracle')
  .parent()
  .parent()
  .contains('See details')
  .click()

  cy.wait(1000);
  cy.contains('span', 'Migration')
  .should('be.visible')
  .click()


  cy.contains('.font-semibold', 'Postgres')
  .parent()
  .parent()
  .contains('See details')
  .click()


  cy.get('input[placeholder="Search..."]')
  .should('be.visible')
  .click()
  .clear()
  .type(migrationData.searchwithname)


  cy.get('button')
  .find('svg.lucide-refresh-ccw')
  .closest('button')
  .should('be.visible')
  .click()


 

});

});

});