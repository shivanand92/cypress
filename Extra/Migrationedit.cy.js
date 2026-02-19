/// <reference types="cypress" />

import loginData from '../../fixtures/login.json';

describe('Edit Migration', () => {
  it('Logs into Tantor portal and creates migration', () => {

    // Load Migration JSON
    cy.fixture('ingestion/Migration.json').then((migrationData) => {

      // Visit Tantor portal
      cy.visit(loginData.URL);

      // Keycloak login
      cy.origin(loginData.KEYCLOAK_URL, { args: loginData }, ({ username, password }) => {
        cy.get('#username', { timeout: 20000 }).should('be.visible').type(username);
        cy.get('#password').should('be.visible').type(password);
        cy.get('input[value="Sign In"]').click();
      });


       cy.get('a[href="/connections"]').click();
      cy.wait(1000);

      // Select connection type
      cy.get('select.w-44.text-slate-500')
        .select(migrationData.connectionType);
      cy.wait(1000);
      //-------------------------------------------
      // Navigate to Migration Page
      //-------------------------------------------
      cy.get('a[href="/migration"]').click();
      cy.wait(1000);


      cy.get('table tbody tr')      // get all rows
  .first()                   // select first row
  .find('button[aria-label="Open actions menu"]')
  .click();


  // Click Edit icon
cy.get('button[aria-label="Edit"]')
  .should('be.visible')
  .click();


cy.wait(1000);


  // Click Delete icon
cy.get('button[aria-label^="Delete"]')
  .should('be.visible')
  .click();

cy.wait(1000);
   // Click on the table dropdown
    cy.get('input[placeholder="Select Table"]').click();
    cy.wait(1000);

    // Type the table name
    cy.get('input[placeholder="Select Table"]').clear().type(migrationData.edittableforsource);
    cy.wait(1000);

    cy.get('div.px-4.py-2.text-sm.cursor-pointer.transition-colors.duration-100.bg-purple-50.text-purple-600').click();


     cy.get('input[placeholder="Select Table"]').eq(1).click();

// Type the table name
cy.get('input[placeholder="Select Table"]').eq(1).type(migrationData.edittablefromtarget);

// Wait (optional, but avoid if possible)
cy.wait(2000);

// Click again to trigger dropdown (if required)
cy.get('input[placeholder="Select Table"]').eq(1).click();
cy.get('div.px-4.py-2.text-sm.cursor-pointer.transition-colors.duration-100.bg-purple-50.text-purple-600').click();
 cy.contains('button', 'UPDATE')
  .should('be.visible')
  .click();

   cy.wait(1000);

   cy.contains('button', 'Yes').click();

      //-------------------------------------------
      // VALIDATE SUCCESS POPUP
      //-------------------------------------------
      cy.contains('h2', 'Success!').should('be.visible');
      
cy.contains('button', 'Alright').click();



function refreshUntilReadyToRun(timeoutMs = 120000) {
  const startTime = Date.now();

  function checkStatus() {
    // ✅ Wait until at least one row exists
    cy.get('table tbody tr', { timeout: 15000 })
      .should('exist')
      .first()
      .within(() => {
        cy.get('td')
          .eq(7)
          .invoke('text')
          .then((text) => {
            const status = text.trim();
            cy.log('🔄 Current Status: ' + status);

            if (status !== 'Ready to Run') {
              if (Date.now() - startTime > timeoutMs) {
                throw new Error('❌ Status did not change to Ready to Run within timeout');
              }

              cy.wait(4000);   // wait before refresh
              cy.reload();     // refresh page
              checkStatus();   // retry after reload
            } else {
              cy.log('✅ Status is Ready to Run');
            }
          });
      });
  }

  checkStatus();
}

// Call function
refreshUntilReadyToRun();




cy.contains('tr', 'Ready to Run')
  .find('button[aria-label="Open actions menu"]')
  .click();

cy.get('button[aria-label="Run"]').click();







 

      });
});
});
