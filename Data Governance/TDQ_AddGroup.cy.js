/// <reference types="cypress" />

describe('Data-Quality => Add Group and Rule', () => {
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

    // Step 3: Click on "Create Rule"
    cy.get('button.bg-\\[\\#8e78b7\\].text-white.rounded-lg').click();
    cy.wait(1000);

    // Step 4: Click "Pre-built" and "Data"
    cy.contains('button', 'Custom').click();
    cy.wait(1000);
    cy.contains('button', 'Data').click();
    cy.wait(2000);

    // Step 1: Click the initial button (e.g., "Add Rule" or similar)
    cy.get('button[type="button"]').click();
    cy.wait(1000);

    // Step 2: Enter group name
    cy.get('input[placeholder="Enter group name"]').type('demo');
    cy.wait(1000);

    // Step 3: Enter rule name
    cy.get('input[placeholder="Enter rule name"]').type('demo');
    cy.wait(1000);

    // Step 4: Enter description
    cy.get('textarea[placeholder="Describe the rule"]').type('Description');
    cy.wait(1000);

    // Step 5: Select first dropdown (assumed to be Priority)
    cy.get('select.w-full.border-2.border-gray-300.focus\\:border-\\[\\#8d77ba\\].rounded-md.px-4.py-2')
      .eq(0)
      .select('High');
    cy.wait(1000);

    // Step 6: Select second dropdown (same class as first)
    cy.get('select.w-full.border-2.border-gray-300.focus\\:border-\\[\\#8d77ba\\].rounded-md.px-4.py-2')
      .eq(1)
      .select('Active');
    cy.wait(1000);
    cy.contains('button', 'Save').click();
    cy.wait(500);
cy.screenshot('Group created successfully');

    });
});