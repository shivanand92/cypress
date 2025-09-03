/// <reference types="cypress" />

describe('Data-Quality Rules Creation with Pre-built and Metadata', () => {
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
    cy.contains('button', 'Pre-built').click();
    cy.wait(1000);
    cy.contains('button', 'Metadata').click();
    cy.wait(2000);

    // Step 5: Click first card
    cy.get('button.border-2.rounded-lg.cursor-pointer').eq(2).click();
    cy.wait(1000);

    // Step 6: Click second checkbox
    cy.get('input[type="checkbox"]').eq(1).click();
    cy.wait(1000);

    // Step 7: Click "Apply" and "Next"
    cy.contains('button', 'Apply').click();
    cy.wait(1000);
    cy.contains('button', 'Next').click();
    cy.wait(1000);

    // Step 8: Interact with first dropdown
    /*cy.get('.react-select__dropdown-indicator').eq(0).click();
    cy.get('input.react-select__input').type('oracleforautomation');
    cy.wait(1000);*/
   // Open the dropdown
cy.get('.react-select__dropdown-indicator').eq(0).click().then($indicator => {
  // Find the closest react-select__control and type inside its input
  cy.wrap($indicator)
    .closest('.react-select__control')
    .find('input.react-select__input')
    .type('Postgresforautomation');
  // Now select the option
  cy.get('.react-select__option').contains('Postgresforautomation').click();
});

    // Open the second dropdown
cy.get('.react-select__dropdown-indicator').eq(1).click().then($indicator => {
  // Find the closest react-select__control and type inside its input
  cy.wrap($indicator)
    .closest('.react-select__control')
    .find('input.react-select__input')
    .type('Postgresforautomation.public');
  // Now select the option (checkbox or item)
  cy.get('.react-select__option').contains('Postgresforautomation.public').click();
});



// Open the third dropdown (index 2, since it's zero-based)
cy.get('.react-select__dropdown-indicator').eq(2).click().then($indicator => {
  // Find the closest react-select__control and type inside its input
  cy.wrap($indicator)
    .closest('.react-select__control')
    .find('input.react-select__input')
    .type('Postgresforautomation.public.ingestion_source');
  // Now select the option (checkbox or item)
  cy.get('.react-select__option').contains('Postgresforautomation.public.ingestion_source').click();
});

// Open the "Select Column" dropdown and select all checkboxes
cy.contains('div', 'Select Column')
  .parents('.react-select__control')
  .find('.react-select__dropdown-indicator')
  .click();

// Wait for options to appear, then select ALL checkboxes
cy.get('.react-select__option').should('exist').then(() => {
  // Select all visible options (checkboxes)
  cy.get('.react-select__option').click({ multiple: true });
});

// Click the "Run SQL" button
cy.get('button[title="Run SQL (required)"]').click();
cy.wait(1000);

// Scroll down to make the "Next" button visible
cy.scrollTo(0, 800);
cy.wait(1000);

// Click the "Next" button
cy.contains('button', 'Next')
  .should('be.visible')
  .and('not.be.disabled')
  .click();

cy.wait(1000);
// Click the "Create" button with better error handling
cy.contains('button', 'Create').click();

// Wait for the API call to complete (success or error)
cy.wait(3000);

// Check if there's an error message on the page
cy.get('body').then($body => {
  if ($body.find('.error, .alert, [data-testid="error"]').length > 0) {
    cy.log('Error message found on page');
    cy.screenshot('Error after Create button click');
  }
});

// If successful, continue with the flow
cy.wait(1000);
cy.screenshot('Rule created successfully');
cy.contains('button', 'Alright').click();

    });
});
