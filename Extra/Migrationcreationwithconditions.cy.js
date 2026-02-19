/// <reference types="cypress" />

describe('Create Migration with Conditions', () => {
  let credentials;
  let migrationData;
  let conditions;



  before(() => {
    // Load all required fixture data
    cy.fixture('login').then(data => credentials = data);
    cy.fixture('ingestion/migration').then(data => migrationData = data);
    cy.fixture('ingestion/Migrationcondition').then(data => conditions = data);

  });

  it('Logs into Tantor and creates a migration with multiple conditions', () => {
    Cypress.on('uncaught:exception', () => false);

    // Login
    cy.visit(credentials.url, { failOnStatusCode: false });
    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Go to Connections and select type
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);
    cy.get('select.w-44.text-slate-500').select(migrationData.connectionType);
    cy.wait(1000);

    // Go to Migration
    cy.get('a[href="/migration"]').click();
    cy.wait(2000);
    cy.contains('button', 'Create Migration').click();

    // Source connection
    cy.get('span.text-gray-800.text-lg.font-bold').click();
    cy.get('div.px-3.py-2.hover\\:bg-gray-100.cursor-pointer.text-sm.text-gray-800').first().click();
    cy.wait(2000);

    // Source schema
    cy.get('div.flex.items-center.gap-1.ml-2').eq(0).click();
    cy.wait(1000);
    cy.get('input[placeholder="Select Connection"]').eq(0).type(migrationData.sourceConnection);
    cy.wait(1000);
    cy.get('div.bg-purple-50.text-purple-600').click();
    cy.wait(1000);
    cy.get('div.flex.items-center.gap-1.ml-2').eq(1).click();
    cy.wait(1000);
    cy.get('input[placeholder="Select Schema"]').eq(0).type(migrationData.sourceSchema);
    cy.wait(1000);
    cy.contains('div', migrationData.sourceSchema).click();
    cy.wait(1000);

    // Ingestion type
    cy.get('input[value="bulk"]').click();
    cy.wait(1000);

    // Dataset
    cy.get('div.flex.items-center.gap-1.cursor-pointer').click();
    cy.wait(1000);
    cy.get('input[placeholder="Search datasets..."]').type(migrationData.datasetName1);
    cy.get('input[type="checkbox"]').eq(1).click();
    cy.wait(1000);

    // Target connection
    cy.get('div.flex.items-center.gap-1.ml-2').eq(2).click();
    cy.wait(1000);
    cy.get('input[placeholder="Select Connection"]').eq(1).type(migrationData.targetConnection);
    cy.wait(1000);
    cy.get('div.bg-purple-50.text-purple-600').click();
    cy.wait(1000);

    // Target schema
    cy.get('div.flex.items-center.gap-1.ml-2').eq(3).click();
    cy.wait(1000);
    cy.get('input[placeholder="Select Schema"]').eq(1).type(migrationData.targetSchema);
    cy.wait(1000);
    cy.contains('div', migrationData.targetSchema).click();
    cy.wait(1000);

    // Final checkbox
    cy.get('input[id="target-0-0"]').click();
    cy.wait(1000);

    // Open condition modal
    cy.get('button.text-purple-600').first().click();
    cy.wait(1000);

    // Loop through each condition and fill the fields
    conditions.forEach((cond, index) => {
      if (index > 0) {
        cy.contains('button', 'Add Condition').click();
        cy.wait(500);
      }

      /*cy.get('select[id="column"]').eq(index).select(cond.column);
      cy.get('select[id="operator"]').eq(index).select(cond.operator);
      cy.get('input[id="value"]').eq(index).clear().type(cond.value);
      cy.wait(500);*/
      cy.get('select[id="column"]').last().select(cond.column);
      cy.get('select[id="operator"]').last().select(cond.operator);
      cy.get('input[id="value"]').last().clear().type(cond.value);
      cy.wait(500);

    });
    //complex
    /*cy.wait(1000);
    cy.get('button.flex.items-center.px-3.py-1\\.5.rounded.text-sm.font-medium.transition-colors.text-gray-500.hover\\:bg-gray-50').click();

   cy.wait(1000);
   cy.get('textarea#complexQuery').type(complexconditon);

    cy.wait(1000);
    cy.contains('button', 'Add Complex Query').click();*/
    //=========complex

    // Final Add Condition click (optional)
    cy.contains('button', 'Add Condition').click();
    cy.wait(1000);

    // Save and confirm
    cy.contains('button', 'Save').scrollIntoView().click();
    cy.wait(1000);
    cy.contains('button', 'SAVE').click();
    cy.wait(1000);
    cy.contains('button', 'Yes').click();
    cy.wait(1000);
    cy.screenshot('Migration_created_successfully');

    // Verify success
    cy.contains('h2', 'Success!').should('be.visible');
    cy.contains('p', 'saved successfully').should('be.visible');
    cy.contains('button', 'Alright').click();

    // Verify status in table
    cy.scrollTo('bottom');
    
  });
});






