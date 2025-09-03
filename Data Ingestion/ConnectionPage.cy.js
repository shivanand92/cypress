/// <reference types="cypress" />

describe('Tantor Connection Flow using ingestion/connectionpage.json', () => {
  let loginData;
  let connectionData;

  before(() => {
    cy.fixture('login').then((data) => {
      loginData = data;
    });

    cy.fixture('ingestion/connectionpage').then((data) => {
      connectionData = data;
    });
  });

  it('Logs in and performs connection searches, view, edit, and delete', () => {
    Cypress.on('uncaught:exception', () => false);

    // Login
    cy.visit(loginData.url);
    cy.get('#username').should('be.visible').type(loginData.username);
    cy.get('#password').should('be.visible').type(loginData.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Go to connections
    cy.get('a[href="/connections"]').click();

    // Select dropdown value
    cy.get('select.w-44.text-slate-500').select(connectionData.connectionType);
    cy.wait(500);

    // Loop over connector buttons and searches
    connectionData.searches.forEach((searchText, index) => {
      cy.get('button.mt-4.text-purple-600').eq(index).click();
      cy.wait(1000);

      cy.get('input[placeholder="Search..."]').type(searchText);
      cy.wait(500);

      if (index === 0) {
        cy.get('input[placeholder="Search..."]').clear();
        cy.wait(500);
      }

      cy.get('button[type="button"]').click(); // Close or cancel
      cy.wait(500);

      cy.get('a[href="/connections"]').click(); // Return to list
      cy.scrollTo(0, 500); // scroll a bit down
    });

    // View, edit, update, delete actions
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);

    // View
    cy.get('td.py-3.px-4.text-center.relative').eq(0).click();
    cy.wait(500);
    cy.get('button[aria-label="View"]').click();
    cy.wait(1000);
    cy.get('input[type="search"]').type(connectionData.searchTableName);
    cy.get('button[title="View Schema"]').click();
    cy.wait(500);
    cy.contains('button', 'Close').click();
    cy.wait(1000);
    cy.contains('button', 'Save Changes').click();
    cy.wait(1000);

    // Edit
    cy.get('td.py-3.px-4.text-center.relative').eq(0).click();
    cy.wait(1000);
    cy.get('button.p-1.text-gray-500').eq(1).click();
    cy.wait(1000);
    cy.get('input[name="connection_name"]').clear().type(connectionData.newConnectionName);
    cy.wait(1000);
    cy.get('input[name="host_address"]').clear().type(connectionData.hostname);
    cy.wait(1000);
    cy.get('input[type="password"]').clear().type(connectionData.newPassword);
    cy.wait(1000);
    cy.contains('button', 'Test Connection').click();
    cy.wait(1000); // optional if needed
    cy.contains('button', 'Update Connection').click();
    cy.screenshot("Edited Successsfully");
    cy.get('button.text-gray-400.hover\\:text-gray-600').click();
    cy.wait(1000);

    // Delete
    cy.get('td.py-3.px-4.text-center.relative').eq(0).click();
    cy.wait(1000);
    cy.get('button.p-1.text-gray-500').eq(3).click(); // Trash
    cy.wait(1000);
    cy.get('td.py-3.px-4.text-center.relative').eq(0).click();
    cy.wait(1000);
    cy.get('button.p-1.text-gray-500').eq(2).click(); // Confirm delete icon
    cy.contains('button', 'Confirm').click();
    cy.screenshot("Deleted Successfully");
    // Wait for success modal and click "Alright"
    cy.contains('button', 'Alright').click();
  });
});



