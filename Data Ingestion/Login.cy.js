/// <reference types="cypress" />

describe('Login page', () => {
  let credentials;

  before(() => {
    cy.fixture('login').then((data) => {
      credentials = data;  // Load data from login.json
    });
  });

  it('Logs into Tantor portal ', function () {
    Cypress.on('uncaught:exception', () => false);

    cy.visit(credentials.url, {
      failOnStatusCode: false,
    });

    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    cy.get('a[href="/dashboard"]').click();
    cy.screenshot('Login successfully');
  });
});