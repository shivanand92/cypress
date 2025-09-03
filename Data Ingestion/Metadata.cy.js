/// <reference types="cypress" />

describe('Metadata Creation with single table', () => {
  let loginData;
  let metadata;

  before(() => {
    cy.fixture('login').then((data) => {
      loginData = data;
    });

    cy.fixture('ingestion/metadata').then((data) => {
      metadata = data;
    });
  });

  it('Logs in and creates a migration', () => {
    Cypress.on('uncaught:exception', () => false);

    // Login
    cy.visit(loginData.url);
    cy.get('#username').should('be.visible').type(loginData.username);
    cy.get('#password').should('be.visible').type(loginData.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // Navigate to Migration
    cy.get('a[href="/migration"]').click();
    cy.wait(1000);
    cy.contains('button', 'Create Migration').click();
  
    //cy.contains('div.cursor-pointer', metadata.sourceConnection).click();
    cy.get('span.text-gray-800.text-lg.font-bold').should('be.visible').click();
    // Click the second option in dropdown
    cy.get('div.px-3.py-2.hover\\:bg-gray-100.cursor-pointer.text-sm.text-gray-800')
      .eq(1) // zero-based index, so 1 = second item
      .should('be.visible')
      .click();
    // Select Source Connection
    cy.wait(1000);
    cy.get('select#connection-select').eq(0).select(metadata.sourceConnection);

    cy.wait(1000);

    // Select Source Schema
    cy.get('select#schema-select').eq(0).select(metadata.sourceSchema);
    cy.wait(1000);

    // Search and select table
    cy.get('input[placeholder="Search datasets..."]').type(metadata.sourceTable);
    cy.wait(1000);
    cy.get('input#select-all').check({ force: true });
    cy.wait(1000);

    // Select Target Connection and Schema
    cy.get('select#connection-select').eq(1).select(metadata.targetConnection);
    cy.wait(1000);
    cy.get('select#schema-select').eq(1).select(metadata.targetSchema);
    cy.wait(1000);
    // Select Transformation Type
    //cy.get('select.w-full.p-1.text-[10px]').eq(2).select(metadata.transformationType);
    cy.get('select[class*="w-full"][class*="text-[10px]"]').eq(4).select(metadata.transformationType);


    cy.wait(1000);

    // Enter transformation text
    cy.get('input[type="text"]').eq(2).type(metadata.Prefixvaluse);

    cy.wait(1000);

    // Click Save
    cy.contains('button', 'Save').click();

    cy.contains('button', 'Yes').click();
    cy.screenshot('Metadata created Successfully');

    // Validate success popup
    cy.contains('h2', 'Success!').should('be.visible');
    cy.contains('p', 'saved successfully').should('be.visible');
    cy.contains('button', 'Alright').click();

    /*// Verify status
    cy.get('table tbody tr').first().within(() => {
    cy.get('td').eq(7).should(($td) => {
        const text = $td.text();
        expect(text).to.match(/Created|Failed/);*/
        
     // });
    //});
  });
});

