/// <reference types="cypress" />

describe('Create Migration ', () => {
  let credentials;
  let migrationData;

  before(() => {
    // Load login credentials
    cy.fixture('login').then(data => credentials = data);

    // ✅ Load migration data from ingestion/migration.json
    cy.fixture('ingestion/migrationsubset').then(data => migrationData = data);
  });

  it('Logs into Tantor and creates a new Migration using fixture data', () => {
    Cypress.on('uncaught:exception', () => false);

    // Login
    cy.visit(credentials.url, { failOnStatusCode: false });
    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Go to Connections
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);
    // Open dropdown and select connection type
    cy.get('select.w-44.text-slate-500').select(migrationData.connectionType);
    cy.wait(1000);


   

    // Go to Migration
    cy.get('a[href="/migration"]').click();
    cy.wait(2000);
    cy.contains('button', 'Create Migration').click();

    // Select source connection
    cy.get('span.text-gray-800.text-lg.font-bold').click();
    cy.get('div.px-3.py-2.hover\\:bg-gray-100.cursor-pointer.text-sm.text-gray-800').first().click();
    cy.wait(2000);

    // Select schema
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

    //subset
    cy.get('input[value="subset"]').click();


    // Click on the table dropdown
    cy.get('input[placeholder="Select Table"]').click();
    cy.wait(1000);

    // Type the table name
    cy.get('input[placeholder="Select Table"]').clear().type(migrationData.tableName);
    cy.wait(1000);

    // Select the dropdown option dynamically using text match
    /*cy.contains('div', migrationData.tableName)
      .should('be.visible')
      .click();*/
      cy.get('div.px-4.py-2.text-sm.cursor-pointer.transition-colors.duration-100.bg-purple-50.text-purple-600').click();

      /*cy.get('div:visible').then($divs => {
  const texts = [...$divs].map(div => div.innerText.trim()).filter(Boolean);
  cy.log('Visible DIV TEXTS:', JSON.stringify(texts));
});*/

    //cy.get('div.flex.items-center.gap-1.ml-2').eq(2).click();
    /*cy.wait(1000);
    cy.get('input[placeholder="Select Connection"]').eq(1).type(migrationData.targetConnection);
    cy.wait(1000);
    cy.get('div.bg-purple-50.text-purple-600').click();
    cy.wait(1000);*/
    cy.get('input[placeholder="Select Connection"]').eq(1).click().type(migrationData.targetConnection);
cy.contains('div', migrationData.targetConnection).should('be.visible');
cy.contains('div', migrationData.targetConnection).click({ force: true });


    // Target schema
    //cy.get('div.flex.items-center.gap-1.ml-2').eq(3).click();
    //cy.wait(1000);
    cy.get('input[placeholder="Select Schema"]').eq(1).should('not.be.disabled');
    cy.get('input[placeholder="Select Schema"]').eq(1).type(migrationData.targetSchema);
    cy.wait(1000);
    cy.contains('div', migrationData.targetSchema).click({ force: true });

    // Click the second "Select Table" input
cy.get('input[placeholder="Select Table"]').eq(1).click();

// Type the table name
cy.get('input[placeholder="Select Table"]').eq(1).type('target_shiva_src1');

// Wait (optional, but avoid if possible)
cy.wait(2000);

// Click again to trigger dropdown (if required)
cy.get('input[placeholder="Select Table"]').eq(1).click();
cy.get('div.px-4.py-2.text-sm.cursor-pointer.transition-colors.duration-100.bg-purple-50.text-purple-600').click();
cy.contains('button', 'SAVE').click();
   cy.wait(1000);

    cy.contains('button', 'Yes').click();
     cy.wait(1000);
    cy.screenshot('Migration  created Successfully');

    // Validate success popup
    cy.contains('h2', 'Success!').should('be.visible');
    cy.contains('p', 'saved successfully').should('be.visible');
    cy.wait(1000);
    cy.contains('button', 'Alright').click();
    cy.wait(2000);

    cy.reload(true);
     cy.wait(4000);
      cy.reload(true);
      cy.wait(2000);
      cy.scrollTo('bottom');
      cy.wait(2000);
      cy.reload(true);
      cy.wait(5000);
      cy.reload(true);
      cy.scrollTo('bottom');
      cy.wait(5000);
      cy.reload(true);
      cy.wait(5000);
      cy.scrollTo('bottom');
      cy.wait(5000);
      cy.reload(true);
      cy.wait(7000);
      cy.reload(true);
      cy.scrollTo('bottom');
      cy.wait(10000);
      cy.reload(true);
      cy.scrollTo('bottom');
      cy.wait(10000);
      cy.reload(true);
      cy.scrollTo('bottom'); 
      cy.wait(10000);
      cy.reload(true);
      cy.wait(10000);
      cy.reload(true);
      cy.scrollTo('bottom'); 
       cy.screenshot('Ready to run');
});
});

/*
/// <reference types="cypress" />

describe('Create Migration', () => {
  let credentials;
  let migrationData;

  before(() => {
    cy.fixture('login').then(data => credentials = data);
    cy.fixture('ingestion/migrationsubset').then(data => migrationData = data);
  });

  function reloadAndScroll(times, waitTime) {
    for (let i = 0; i < times; i++) {
      cy.reload(true);
      cy.wait(waitTime);
      cy.scrollTo('bottom');
      cy.wait(waitTime);
    }
  }

  it('Logs into Tantor and creates a new Migration using fixture data', () => {
    Cypress.on('uncaught:exception', () => false);

    // Login
    cy.visit(credentials.url, { failOnStatusCode: false });
    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Go to Connections
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);
    cy.get('select.w-44.text-slate-500').select(migrationData.connectionType);
    cy.wait(1000);

    // Go to Migration
    cy.get('a[href="/migration"]').click();
    cy.wait(2000);
    cy.contains('button', 'Create Migration').click();

    // Select source connection
    cy.get('span.text-gray-800.text-lg.font-bold').click();
    cy.get('div.px-3.py-2.hover\\:bg-gray-100.cursor-pointer.text-sm.text-gray-800').first().click();
    cy.wait(2000);

    // Select schema
    cy.get('div.flex.items-center.gap-1.ml-2').eq(0).click();
    cy.get('input[placeholder="Select Connection"]').eq(0).type(migrationData.sourceConnection);
    cy.get('div.bg-purple-50.text-purple-600').click();

    cy.get('div.flex.items-center.gap-1.ml-2').eq(1).click();
    cy.get('input[placeholder="Select Schema"]').eq(0).type(migrationData.sourceSchema);
    cy.contains('div', migrationData.sourceSchema).click();

    // Subset section
    cy.get('input[value="subset"]').click();
    cy.get('input[placeholder="Select Table"]').click().clear().type(migrationData.tableName);
    cy.get('div.px-4.py-2.text-sm.cursor-pointer.transition-colors.duration-100.bg-purple-50.text-purple-600').click();

    // Target connection and schema
    cy.get('input[placeholder="Select Connection"]').eq(1).click().type(migrationData.targetConnection);
    cy.contains('div', migrationData.targetConnection).click({ force: true });

    cy.get('input[placeholder="Select Schema"]').eq(1).should('not.be.disabled')
      .type(migrationData.targetSchema);
    cy.contains('div', migrationData.targetSchema).click({ force: true });

    // Target table
    cy.get('input[placeholder="Select Table"]').eq(1).click().type('target_shiva_src1');
    cy.get('input[placeholder="Select Table"]').eq(1).click();
    cy.get('div.px-4.py-2.text-sm.cursor-pointer.transition-colors.duration-100.bg-purple-50.text-purple-600').click();

    // Save migration
    cy.contains('button', 'SAVE').click();
    cy.contains('button', 'Yes').click();
    cy.screenshot('Migration_created_Successfully');

    // Validate success
    cy.contains('h2', 'Success!').should('be.visible');
    cy.contains('p', 'saved successfully').should('be.visible');
    cy.contains('button', 'Alright').click();

    // Perform scroll and reload cycles
    reloadAndScroll(5, 9000);

    cy.screenshot('Ready_to_run');
  });
});

*/