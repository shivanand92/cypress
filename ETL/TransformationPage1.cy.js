/// <reference types="cypress" />

describe('Transformation Page1 (Search.Refresh,Toggle, Filter) ', () => {
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
  .type('etl_testingoracle_src_postgresforautomation_34');


  cy.scrollTo('bottom');
   

 cy.wait(1000);
// Clear the input
cy.get('input[placeholder="Search transformations"]').clear();
 cy.wait(1000);

// Click Refresh data button
cy.get('button[title="Refresh data"]').click();
 cy.wait(1000);

  cy.screenshot('Refreshed succesfully');
cy.wait(4000);
// Click Show List Only button
cy.get('button[title="Show List Only"]').click();

// Wait 2 seconds
cy.wait(2000);

// Click Show List Only again
cy.get('button[title="Show All Views"]').click();

 cy.wait(1000);
cy.scrollTo('bottom');

cy.get('th.py-3.px-4.text-left.sticky.top-0.bg-gray-800.z-10')
  .eq(0)   // [1] in XPath = eq(0) in Cypress
  .click();






    });
});
