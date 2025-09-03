/// <reference types="cypress" />

describe('Data-Quality Rule page Toggel , refresh, Delete', () => {
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
    cy.get('input[placeholder="Search rules"]').type('Pre-built');


    // Wait 1 second
cy.wait(1000);

// Click the second checkbox (you must use a unique class or attribute to identify it)
cy.get('input[type="checkbox"]').eq(1).click(); // eq(1) is the second checkbox (0-based index)

// Wait 1 second
cy.wait(1000);

// Click the first "Refresh Rule" button

cy.get('button[title="Refresh Rule"]').eq(0).click();
cy.wait(1000);

cy.screenshot('Refesrhed successfully');
cy.wait(1000);
//======================================================Delete
// Horizontal scrolling - scroll the table from left to right
cy.get('.overflow-x-auto').should('be.visible').then(($table) => {
  // Get the scrollable element
  const scrollableElement = $table[0];
  
  // Scroll to the right edge to see all columns
  cy.wrap(scrollableElement).scrollTo('right', { duration: 1000 });
  cy.wait(1000);

  cy.get('button[title="Delete Rule"]').eq(0).click();
  cy.wait(1000);
  cy.get('button.px-4.py-2.bg-red-600.text-white.rounded-md').contains('Delete').click();
  cy.wait(1000);
  cy.screenshot('Rule Deleted uccessfully');
  });

//====================================================================================================
  //Refresh all 
cy.get('input[type="checkbox"]').eq(0).click();
cy.wait(1000);
cy.get('button.w-full.text-left.px-4.py-2.hover\\:bg-gray-100.text-sm.font-medium.text-gray-700.transition-colors.flex.items-center.gap-2')
  .eq(1) // second element, zero-based
  .click();
cy.wait(1000);
cy.get('input[type="checkbox"]').eq(0).click();
cy.wait(1000);
//=============================================Schdular 
cy.get('input[type="checkbox"]').eq(0).click();
cy.wait(1000);
cy.get('button.w-full.text-left.px-4.py-2.hover\\:bg-gray-100.text-sm.font-medium.text-gray-700.transition-colors.flex.items-center.gap-2')
  .eq(2) // second element, zero-based
  .click();
cy.wait(1000);

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
cy.wait(1000);
//===========================================================================================
//  This is for Filter
cy.get('input[type="checkbox"]').eq(0).click();
cy.wait(1000);
cy.get('th.text-left.p-4.cursor-pointer.hover\\:bg-\\[\\#3a4563\\]')
  .eq(1) // second element, zero-based
  .click();
  cy.screenshot('Column Filtered Successfully');






    });


     });
