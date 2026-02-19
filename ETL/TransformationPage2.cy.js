/*/// <reference types="cypress" />

describe('Transformation Page2 (Edit.icon,Delete) ', () => {
  let credentials;

  before(() => {
    // Load the login.json file from ETL folder
    cy.fixture('ETL/login').then((data) => {
      credentials = data;
    });
  });

  it('Logs into Tantor portal and performs migration creation', function () {
    Cypress.on('uncaught:exception', () => false);

    cy.visit(credentials.url, {
      failOnStatusCode: false,
    });

    cy.get('#username', { timeout: 10000 })
      .should('be.visible')
      .type(credentials.username);

    cy.get('#password')
      .should('be.visible')
      
      .type(credentials.password);

    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    cy.get('a[href="/dashboard"]').click();
    cy.wait(2000);
 cy.wait(1000);
    // Go to Connections
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);
    // Open dropdown and select connection type
    cy.get('select.w-44.text-slate-500').select('shiva');
    cy.wait(1000);

    cy.get('a[href="/transformation"]').click();
    cy.wait(1000);



    // Type into the search box
cy.get('input[placeholder="Search transformations"]')
  .type('column');


  cy.scrollTo('bottom');
   

 cy.wait(1000);


 // First, find the row with your transformation and click the 3-dot menu
cy.contains('td', 'column')
.parent('tr')
.find('button[aria-label*="action"], button[aria-label*="menu"], .action-menu, [data-testid*="action"]')
.click();

// Click the edit button directly
//cy.get('button[aria-label="Edit"]').click();

cy.get('button[aria-label="Delete"]').click();

 cy.screenshot('Deleted succesfully');
cy.contains('h2', 'Delete Confirmation')
  .parents('div.bg-white.rounded-2xl')
  .find('button')
  .contains(/^Yes$/)
  .click({ force: true });

  cy.screenshot('Deleted succesfully');
 
    });
});*/


//=============================================================================================


/// <reference types="cypress" />

describe('Transformation Page2 (Edit.icon,Delete)', () => {
  let credentials;
  let transformationData;

  before(() => {
    // Load login data
    cy.fixture('ETL/login').then((data) => {
      credentials = data;
    });

    // Load transformation data
    cy.fixture('ETL/Transformationpage').then((data) => {
      transformationData = data;
    });
  });

  it('Logs into Tantor portal and performs migration creation', function () {
    Cypress.on('uncaught:exception', () => false);

    // Visit and login
    cy.visit(credentials.url, { failOnStatusCode: false });

    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Navigate to dashboard and connections
    cy.get('a[href="/dashboard"]').click();
    cy.wait(1000);
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);

    // Select connection type from JSON
    cy.get('select.w-44.text-slate-500').select(transformationData.connectionType);

    cy.wait(1000);
    cy.get('a[href="/transformation"]').click();
    cy.wait(1000);

    // Type into the search box from JSON
    cy.get('input[placeholder="Search transformations"]').type(transformationData.searchText);

    cy.scrollTo('bottom');
    cy.wait(1000);

    // Open 3-dot menu for the row matching search text
    cy.contains('td', transformationData.searchText)
      .parent('tr')
      .find('button[aria-label*="action"], button[aria-label*="menu"], .action-menu, [data-testid*="action"]')
      .click();

    // Delete action
    cy.get('button[aria-label="Delete"]').click();

    cy.contains('h2', 'Delete Confirmation')
  .parents('div.bg-white.rounded-2xl')
  .find('button')
  .contains(/^Yes$/)
  .click({ force: true });

    cy.screenshot('Deleted successfully');
  });
});
