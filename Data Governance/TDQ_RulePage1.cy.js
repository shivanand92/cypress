/// <reference types="cypress" />

describe('Data-Quality Rule page Toggel , Run, Edit, Schedular, Search', () => {
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
   
    cy.get('input[placeholder="Search rules"]').click();
    cy.wait(1000);
    cy.get('input[placeholder="Search rules"]').type('Accuracy');


    // Wait 1 second
cy.wait(1000);

// Click the second checkbox (you must use a unique class or attribute to identify it)
cy.get('input[type="checkbox"]').eq(1).click(); // eq(1) is the second checkbox (0-based index)

// Wait 1 second
cy.wait(1000);

// Click the first "Refresh Rule" button


// Horizontal scrolling - scroll the table from left to right
cy.get('.overflow-x-auto').should('be.visible').then(($table) => {
  // Get the scrollable element
  const scrollableElement = $table[0];
  
  // Scroll to the right edge to see all columns
  cy.wrap(scrollableElement).scrollTo('right', { duration: 1000 });
  cy.wait(1000);
});

// Hover over the first "Run" button
cy.get('button[title="Run"]').eq(0).trigger('mouseover');

// Wait 1 second
cy.wait(1000);

// Click the first "Run Selected IDs" button
cy.contains('button', 'Run Selected IDs').eq(0).click({ force: true });

cy.wait(3000);
cy.get('button[title="Run"]').eq(1).click();
cy.wait(1000);

// Click the cross (X) button to close the modal
cy.get('button[aria-label="Close modal"]').click();
cy.wait(1000);

// Click the Edit button
cy.get('button[title="Edit"]').click();
cy.wait(1000);

// Click the Refresh button
cy.get('button[title="Refresh"]').click();
cy.wait(1000);
//select the connection
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

  cy.wait(1000);
cy.get('button[title="Run SQL (required)"]').click();
cy.wait(3000);
cy.scrollTo(0, 800);
cy.wait(1000);

// Click the "Next" button
cy.contains('button', 'Next')
  .should('be.visible')
  .and('not.be.disabled')
  .click();

cy.wait(1000);
// Click the "Create" button with better error handling
cy.contains('button', 'Update').click();

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
cy.screenshot('Rule updated successfully');
cy.contains('button', 'Alright').click();

cy.wait(1000);

cy.get('button[title="Schedule Rule"]').eq(0).click();


cy.get('select.w-full.p-2.border.border-gray-300.rounded-md')
  .select('Once');

// Select current date for the calendar
const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
cy.get('input[type="date"]').clear().type(today);
cy.wait(1000);

// Select current time for the time input
const now = new Date();
const currentTime = now.toTimeString().slice(0, 5); // Format: HH:MM
cy.get('input[type="time"]').clear().type(currentTime);
cy.wait(1000);

// Click the Schedule button
cy.get('button.px-4.py-2.bg-\\[\\#8e78b7\\].text-white.rounded-md').contains('Schedule').click();
cy.wait(1000);

cy.screenshot('successfully scheduled rules');

// Click the toggle button to switch views
cy.get('button[title="Hide Cards View"]').click();
cy.wait(1000);

// Click the toggle button again to come back to original view
// Use the SVG icon to find the button regardless of title
cy.get('button').find('svg.lucide-list').parent().click();
cy.wait(1000);




});




});


     });
