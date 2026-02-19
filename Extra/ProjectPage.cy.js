/// <reference types="cypress" />

describe('Project Edit and delete', () => {
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

    //========================Toggel and refresh================
    // Click the first button with type="button"
cy.get('button[type="button"]').eq(0).click();
cy.wait(1000);

// Type "demo" into the Search input
cy.get('input[placeholder="Search..."]').type('demo');
cy.wait(1000);

// Clear the Search input
cy.get('input[placeholder="Search..."]').clear();
cy.wait(1000);
cy.get('a[href="/project"]').click();
 cy.wait(1000);
// Click the second button with type="button"
cy.get('button[type="button"]').eq(1).click();

    //===============================================================

    cy.scrollTo(0, 1000);
    cy.wait(1000);

    // Click the first icon button (use a more specific selector if needed)
    cy.get('button.p-2.text-gray-600.hover\\:text-gray-800.rounded-full.hover\\:bg-gray-100').first().click();
    cy.wait(1000);

    // Click the Edit button
    cy.get('button[aria-label="Edit"]').click();
    cy.wait(1000);

    // Clear and type in the "Name" input field
    cy.get('input[placeholder="Name"]').clear().type(project.Projecteditanddelete);
    cy.wait(1000);

    // Click the Save button
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.screenshot('project edited successfully');

    cy.contains('button', 'Alright').click();
    cy.wait(1000);
    cy.get('button.p-2.text-gray-600.hover\\:text-gray-800.rounded-full.hover\\:bg-gray-100').first().click();
    cy.wait(1000);

    // Click the Delete button
cy.get('button[aria-label="Delete"]').click();
cy.wait(1000);

// Click the OK button in the confirmation modal
cy.contains('button', 'OK').click();

cy.screenshot('project Deleted successfully');
cy.wait(2000);

      });
});