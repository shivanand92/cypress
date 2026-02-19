/// <reference types="cypress" />

describe('Login and Project Creation Automation', () => {
  let credentials;
  let project;

  before(() => {
    // Load login credentials
    cy.fixture('login').then((data) => {
      credentials = data;
    });

    // Load project input data
    cy.fixture('projectData').then((data) => {
      project = data;
    });
  });

  it('Logs into Tantor and creates a new project', () => {
    Cypress.on('uncaught:exception', () => false);

    // Login
    cy.visit(credentials.url, { failOnStatusCode: false });
    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Navigate to Project page and create project
    cy.get('a[href="/project"]').click();
    cy.wait(1000);

    cy.contains('+ Create Project').click();
    cy.wait(1000);

    cy.get('input[placeholder="Name"]').type(project.projectName);
    cy.wait(1000);

    cy.get('input[placeholder="Manager"]').type(project.managerEmail);
    cy.wait(1000);

    cy.get('div.bg-white.rounded-2xl.w-\\[1000px\\].p-8.max-h-\\[90vh\\].overflow-y-auto')
      .find('button')
      .contains('Create')
      .click();
    cy.screenshot('Project created');
    cy.wait(1000);
    

    cy.get('div.bg-white.rounded-2xl.w-\\[600px\\].overflow-hidden.shadow-xl')
      .find('button')
      .contains('Alright')
      .click();

  });
});
