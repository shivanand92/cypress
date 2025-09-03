/// <reference types="cypress" />

describe('Data-Quality Rule Library Page', () => {
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
    cy.get('a[href="/datagovernance/data-assurance/rules"]').click();
cy.wait(1000);
    cy.get('button[title="Rule library"]').click();
cy.wait(1000);
cy.get('input[placeholder="Search rules"]').click();
cy.wait(1000);

// Type 'test' into the input
cy.get('input[placeholder="Search rules"]').type('test');

// Optional: Clear the input (if needed)
    cy.get('input[placeholder="Search rules"]').clear();
    cy.wait(1000);
    cy.scrollTo(0, 200); // scrolls a little bit down

     cy.get('input[placeholder="Search rules"]').click();
    cy.wait(1000);
    cy.get('input[placeholder="Search rules"]').type('test');



    // Horizontal scrolling - scroll the table from left to right
cy.get('.overflow-x-auto').should('be.visible').then(($table) => {
  // Get the scrollable element
  const scrollableElement = $table[0];
  
  // Scroll to the right edge to see all columns
  cy.wrap(scrollableElement).scrollTo('right', { duration: 1000 });
  cy.wait(1000);
  
  // Click the View Details arrow button
  cy.get('button[title="View Details"]').click();
  cy.wait(1000);
  cy.screenshot('Rule Details');

// Click the cross button to close the details view
cy.get('button').find('svg.lucide-x').parent().click();
cy.wait(1000);

// Click the toggle button to switch views
cy.get('button[title="Hide Cards View"]').click();
cy.wait(1000);

// Click the toggle button again to come back to original view
// Use the SVG icon to find the button regardless of title
cy.get('button').find('svg.lucide-list').parent().click();
cy.wait(1000);

cy.contains('button', 'Back').should('be.visible').click();

});

    });


     });
