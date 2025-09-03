/// <reference types="cypress" />

describe('Data-Quality Rules Summary Page', () => {
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
    cy.contains('button', 'Data').click();
    cy.wait(2000);

    // Step 5: Click first card
    cy.get('button.border-2.rounded-lg.cursor-pointer').eq(1).click();
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
        .type(credentials.Dataquality.connection);
      // Now select the option
      cy.get('.react-select__option').contains(credentials.Dataquality.connection).click();
    });

    // Open the second dropdown
    cy.get('.react-select__dropdown-indicator').eq(1).click().then($indicator => {
      // Find the closest react-select__control and type inside its input
      cy.wrap($indicator)
        .closest('.react-select__control')
        .find('input.react-select__input')
        .type(credentials.Dataquality.shchema);
      // Now select the option (checkbox or item)
      cy.get('.react-select__option').contains(credentials.Dataquality.shchema).click();
    });



    // Open the third dropdown (index 2, since it's zero-based)
    cy.get('.react-select__dropdown-indicator').eq(2).click().then($indicator => {
      // Find the closest react-select__control and type inside its input
      cy.wrap($indicator)
        .closest('.react-select__control')
        .find('input.react-select__input')
        .type(credentials.Dataquality.table);
      // Now select the option (checkbox or item)
      cy.get('.react-select__option').contains(credentials.Dataquality.table).click();
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
    cy.wait(2000);

//===================================================================================================
    //Add New Connection

    cy.get('button[title="Add Connection"]').click();
 cy.wait(2000);
 cy.screenshot('Added connection successfully');
    cy.get('button[title="Refresh"]').eq(1).click(); // eq(1) because index is zero-based
    cy.wait(2000);
     // Step 8: Interact with first dropdown
    
     cy.get('button[title="Delete"]').eq(1).click(); // eq(1) for 2nd element (0-based index)
    cy.wait(1000);
    cy.get('button[type="button"]').eq(0).click(); // eq(0) because Cypress uses 0-based indexing
 cy.wait(1000);

 // Click on the search input
cy.get('input[placeholder="Search in queries..."]').click();

// Type the SQL query
cy.get('input[placeholder="Search in queries..."]')
  .type("SELECT COUNT(*) AS invalid_count FROM connection.schema.table WHERE LOWER(TRIM(column)) NOT IN ('true', 'false', '1', '0', 'yes', 'no') HAVING COUNT(*) > 0;");

// Clear the input field
cy.get('input[placeholder="Search in queries..."]').clear();


cy.contains('button', 'Back').click();


  });
});
