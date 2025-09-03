/// <reference types="cypress" />

describe('Data-Quality Metadata Page', () => {
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
    cy.get('a[href="/datagovernance/data-assurance/metadata"]').click();
    cy.wait(9000);
    cy.get('input[placeholder="Search metadata"]').click();
cy.wait(1000);
// Type "Postgres" into it
cy.get('input[placeholder="Search metadata"]').type('Postgres');
    cy.scrollTo(0, 500);
    cy.get('button.text-\\[\\#8e78b7\\].hover\\:text-\\[\\#6b5b8d\\]').eq(0).click();
    cy.screenshot('Group Score Details visibled successfully');
    cy.get('button[aria-label="Close modal"]').click();
cy.wait(1000);
    cy.get('input[placeholder="Search metadata"]').clear();
    cy.wait(1000);
    // Click the input field
cy.get('input[placeholder="Search metadata"]').click();
cy.wait(1000);
// Type "Postgres" into it
cy.get('input[placeholder="Search metadata"]').type('Postgres');
cy.wait(1000);
cy.scrollTo(0, 500);
cy.wait(1000);
// Clear the input field
cy.get('input[placeholder="Search metadata"]').clear();


cy.get('button[title="Hide Card View"]').click();
cy.wait(2000); // optional small wait
cy.get('button').find('svg.lucide-list').parent().click();
cy.wait(1000);

cy.get('button.text-black.border').eq(1).click();
cy.wait(7000);
cy.screenshot('Refreshed Successfully');





     });
});