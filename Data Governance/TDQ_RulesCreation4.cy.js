/// <reference types="cypress" />

describe('Data-Quality Rules Creation with Custom and Data', () => {
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
    cy.get('input[placeholder="Enter group name"]').type('demo1');
    cy.wait(1000);

    // Step 3: Enter rule name
    cy.get('input[placeholder="Enter rule name"]').type('demo1');
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


    // Group click
   // cy.get('button.border-2.rounded-lg.cursor-pointer.transition-all.transform.hover\\:-translate-y-1.hover\\:shadow-md.border-\\[\\#8d77ba\\].border-opacity-30.hover\\:border-opacity-70').click();
cy.get('button.border-2.rounded-lg.cursor-pointer.transition-all.transform.hover\\:-translate-y-1.hover\\:shadow-md.border-\\[\\#8d77ba\\].border-opacity-30.hover\\:border-opacity-70')
  .eq(0)
  .click();

    cy.get('input[type="checkbox"]').eq(0).click();
  cy.wait(500);
    cy.contains('button', 'Apply').click();


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
cy.wait(1000);
// Step 1: Click inside the editor
// Step 1: Click the editor to focus it
// Step 1: Click the Ace editor to focus it
//cy.get('.ace_content').eq(0).click();
cy.get('.ace_content').eq(0).click({ force: true });


// Step 2: Ensure the textarea has focus before typing
cy.get('.ace_text-input')
  .eq(0)
  .click({ force: true }) // required due to 1px hidden size
  .type('{ctrl}a{backspace}', { force: true }) // clear existing text
  .type(
    "SELECT column FROM connection.schema.table GROUP BY column HAVING column NOT IN ('Y','N')",
    { force: true, delay: 10 }
  );

cy.wait(1000);
cy.get('button[title="Run SQL (required)"]').click();
cy.wait(3000);
cy.contains('button', 'Score Query').click();

cy.wait(1000);
// Step 1: Click the second Ace Editor to focus it
// Step 1: Click the second Ace Editor to focus it
cy.get('.ace_content').eq(1).click();

// Step 2: Clear its content using the real hidden input field
cy.get('.ace_text-input')
  .eq(1)
  .type('{ctrl}a{backspace}', { force: true });


// Step 2: Type into the hidden ace text input
cy.get('.ace_text-input')
  .eq(1)
  .type(
    "SELECT COUNT(CASE WHEN column NOT IN ('Y', 'N') THEN 1 END) AS vio_count, COUNT(*) AS total_count FROM connection.schema.table",
    {
      force: true,
      delay: 10 // Optional for simulating real typing
    }
  );

// Click the "Run SQL" button
cy.get('button[title="Run SQL (required)"]').click();
cy.wait(3000);

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