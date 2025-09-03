/// <reference types="cypress" />

describe('Data-Quality Data page => Quality', () => {
  let credentials;

  before(() => {
    cy.fixture('userCredentials').then((data) => {
      credentials = data;
      
    });
  });

  it('Logs into Tantor portal and creates multiple groups', function () {
    Cypress.on('uncaught:exception', () => false);

    // Step 1: Login
    cy.visit(credentials.url, { failOnStatusCode: false });

    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Step 2: Navigate to Group Management Page
    cy.get('a[href="/dashboard"]').click();
    cy.contains('Data Governance', { timeout: 10000 }).should('be.visible').click();
    cy.wait(2000);


    // Step 1: Click menu buttons (2nd and 3rd)
    cy.get('button.p-1.hover\\:bg-gray-200.rounded-full.transition-transform.duration-300').eq(1).click();
    cy.wait(1000);
    cy.get('button.p-1.hover\\:bg-gray-200.rounded-full.transition-transform.duration-300').eq(2).click();
    cy.wait(1000);

    // Step 2: Click link to Rules page
    cy.get('a[href="/datagovernance/data-assurance/data"]').click();
    cy.get('div.ace_content').click();
cy.wait(1000);
    //cy.get('div.ace_content').click().type('SELECT * FROM Dataquality1.public.testing', { delay: 0 });

    cy.get('textarea.ace_text-input')
  .click({ force: true }) // ensures focus
  .type('SELECT * FROM Dataquality1.public.testing', { force: true, delay: 0 });

cy.wait(1000);
  cy.contains('button', 'Run').click({ force: true });


 // cy.contains('button', 'Run').click();

cy.wait(1000);
cy.get('button.text-gray-500.p-1.hover\\:bg-gray-50.rounded').eq(0).click();
cy.wait(1000);
 cy.contains('button', 'Next').click({ force: true });
 cy.wait(2000);
 //cy.scrollTo('bottom');
cy.wait(1000);
 cy.get('button.bg-gray-300').click({ force: true });
cy.wait(75000);
cy.screenshot('Quality page visible');
//cy.scrollTo('bottom');
cy.get('input[placeholder="Search data..."]').click();
cy.wait(1000);
cy.get('input[placeholder="Search data..."]').type('oracle');
cy.scrollTo('bottom');
cy.wait(1000);
cy.get('input[placeholder="Search data..."]').clear();

// Refresh button
cy.get('button[class*="text-black"][class*="rounded-lg"]').click();
cy.wait(68000);

cy.screenshot('Refreshed successfully');

cy.contains('button', 'Previous').click({ force: true });


 //cy.get('button[class*="bg"][class*="text-white"]').click({ force: true });
 //cy.get('button[class*="bg"][class*="text-white"]').eq(1).click({ force: true });




   });
});