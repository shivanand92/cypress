/// <reference types="cypress" />

describe('Login and Create Connection in Tantor', () => {
  let credentials;
  let connectionData;

  before(() => {
    cy.fixture('login').then((data) => {
      credentials = data;
    });
    cy.fixture('connection').then((data) => {
      connectionData = data;
    });
  });

  it('Logs in and adds a new connector', () => {
    Cypress.on('uncaught:exception', () => false);

    // Login
    cy.visit(credentials.url, { failOnStatusCode: false });
    cy.get('#username').should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Navigate to Project, then Connections
    cy.get('a[href="/project"]').click();
    cy.wait(1000);
    cy.get('a[href="/connections"]').click();

    // Open dropdown and select connection type
    cy.get('select.w-44.text-slate-500').select(connectionData.connectionType);
    cy.wait(1000);

    // Click "+ Add Connector"
    cy.contains('button', '+ Add Connector').click();
    cy.wait(1000);

    // Search for connector
    cy.get('input[type="search"]').type(connectionData.searchConnector);
    cy.wait(1000);

    // Click first matching connector
    cy.get('div.p-4.rounded-lg.shadow-sm.border.flex.items-center').first().click();
    cy.wait(1000);

    // Click "Next" button
    cy.contains('button', 'Next').click();
     cy.wait(1000);
     // Fill Details section
cy.get('input[name="connection_name"]').type(connectionData.connectionName);
cy.get('input[name="description"]').type(connectionData.description);
cy.get('select[name="pool_type"]').select(connectionData.behaviour);

// Fill Credentials section
cy.get('input[name="host_address"]').type(connectionData.host);
cy.get('input[name="port_number"]').type(connectionData.port);
cy.get('input[name="username"]').type(connectionData.dbUsername);
cy.get('input[name="password"]').type(connectionData.dbPassword);
cy.get('input[name="database_name"]').type(connectionData.databaseName);
cy.get('input[name="source_schema"]').type(connectionData.schema);

// Click "Test Connection"
cy.contains('button', 'Test Connection').click();

// Optionally, wait for a success message or some indication that the test connection passed
// cy.contains('Connection successful').should('be.visible'); // Uncomment and adjust if needed
cy.wait(3000);
// Click "Create and Save"
cy.contains('button', 'Create and Save').click();
cy.screenshot('Connection created successfully');
// Optionally, wait for the modal to appear
cy.contains('Congratulations!').should('be.visible');
 cy.contains('button', 'Alright').click();

  });
});
