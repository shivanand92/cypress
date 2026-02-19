/// <reference types="cypress" />

import loginData from '../../fixtures/login.json';

describe('Create Purge using JSON Data', () => {
  it('Logs into Tantor portal and creates purge', () => {

    // Load purge JSON
    cy.fixture('ingestion/purge.json').then((purgeData) => {

      // Visit Tantor portal
      cy.visit(loginData.URL);

      // Keycloak login
      cy.origin(loginData.KEYCLOAK_URL, { args: loginData }, ({ username, password }) => {
        cy.get('#username', { timeout: 20000 }).should('be.visible').type(username);
        cy.get('#password').should('be.visible').type(password);
        cy.get('input[value="Sign In"]').click();
      });

      // Go to connections page
      cy.get('a[href="/connections"]').click();
      cy.wait(1000);

      // Select connection type from JSON
      cy.get('select.w-44.text-slate-500')
        .select(purgeData.connectionType);
      cy.wait(1000);

       // Continue purge flow
    cy.wait(1000);
    cy.get('a[href="/purge"]').click();
    cy.wait(1000);


    cy.get('tbody tr')
  .first()
  .find('button[aria-label="Open actions menu"]')
  .should('be.visible')
  .click()


  cy.get('button[aria-label="Edit"]')
  .should('be.visible')
  .click()


   cy.contains('label', 'Subset')
  .prev('input[type="radio"]')
  .check({ force: true });

      cy.wait(1000);


  // Dataset search (JSON)
      cy.get('input[placeholder="Search datasets..."]').type(purgeData.editpurgetable);
      cy.get('input[type="checkbox"]').eq(purgeData.checkboxIndex).click();
      cy.wait(1000);

      // Target connection/schema from JSON
      //cy.get('select').eq(2).select(purgeData.targetConnection);
      //cy.get('select').eq(3).select(purgeData.targetSchema);

   // Select the second input (index 1 because Cypress is 0-based)
cy.get('input[placeholder="Search datasets..."]')
  .eq(1)         // 0 = first, 1 = second
  .click()
  .type(purgeData.subsettable); // type the value
     


  // Save
      cy.contains('button', 'OK').eq(0).click();



      cy.wait(1000);
         //cy.contains('button', 'OK').eq(1).scrollIntoView().click({ force: true });
         cy.get('button.bg-transparent.hover\\:bg-\\[\\#8e78b7\\].text-xs.text-gray-700.font-semibold.hover\\:text-white.py-2.px-10.border.border-gray-700.hover\\:border-transparent.rounded')
        .eq(3) // 0-based index for the 4th element
        .click();



        cy.wait(1000); 
      cy.contains('button', 'Save').should('be.visible').click();
      
      cy.wait(1000);
          cy.contains('button', 'Yes').click();
           cy.wait(1000);
           cy.scrollTo('bottom'); 
          

 cy.wait(2000);
           cy.reload(true);


           cy.wait(3000);
          // cy.reload();
cy.wait(2000);
           cy.get('table tbody tr')         // all rows
  .eq(0)                         // first row
  .find('td')                    // all columns
  .eq(8)                         // 9th column (index starts at 0)
  .find('button[aria-label="Open actions menu"]')   // the action button
  .click({ force: true });  
     });
});
});