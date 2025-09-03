/// <reference types="cypress" />

describe('Purge creation with single table', () => {
  let credentials;
  let purgeData;

  before(() => {
    // Load login data from login.json
    cy.fixture('login').then((data) => {
      credentials = data;
    });

    // Load purge data from ingestion/purge.json
    cy.fixture('ingestion/purge').then((data) => {
      purgeData = data;
    });
  });

  it('Logs in and adds a new connector', () => {
    Cypress.on('uncaught:exception', () => false);

    // Use credentials from login.json
    cy.visit(credentials.url, { failOnStatusCode: false });
    cy.get('#username').should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Navigate to Connections
    cy.get('a[href="/project"]').click();
    cy.wait(1000);
    cy.get('a[href="/connections"]').click();

    // Use connectionType from ingestion/purge.json
    cy.get('select.w-44.text-slate-500').select(purgeData.connectionType);
    
    // Continue purge flow
    cy.wait(1000);
    cy.get('a[href="/purge"]').click();
    cy.wait(1000);
    cy.contains('button', 'Create Purge').click();
    cy.wait(1000);
    cy.get('button.absolute.top-4.right-4.p-2.rounded-lg.hover\\:bg-gray-800.transition-colors').click();

    // Optional custom commands
    cy.dragDefineToCanvas({ x: 200, y: 400 });
    cy.dragSourceToCanvas({ x: 600, y: 400 });
    cy.dragTargetToCanvas({ x: 800, y: 200 });
    cy.get('.react-flow__controls-zoomout').click().click().click();

    // Connect Define to Source by dragging from Define's right handle to Source's left handle
    cy.get('[data-id="node_+0-null-source"]').should('be.visible');
    cy.get('[data-id="node_+1-null-target"]').should('be.visible');
    cy.get('[data-id="node_+0-null-source"]').then($source => {
      const sourceRect = $source[0].getBoundingClientRect();
      cy.get('[data-id="node_+1-null-target"]').then($target => {
        const targetRect = $target[0].getBoundingClientRect();
        cy.wrap($source)
          .trigger('mousedown', {
            button: 0,
            clientX: sourceRect.x + sourceRect.width / 2,
            clientY: sourceRect.y + sourceRect.height / 2,
            force: true
          });
        cy.wrap($target)
          .trigger('mousemove', {
            button: 0,
            clientX: targetRect.x + targetRect.width / 2,
            clientY: targetRect.y + targetRect.height / 2,
            force: true
          })
          .trigger('mouseup', {
            force: true
          });
      });
    });

    // Connect Source to Target by dragging from Source's right handle to Target's left handle
    cy.get('[data-id="node_+1-null-source"]').should('be.visible');
    cy.get('[data-id="node_+2-null-target"]').should('be.visible');
    cy.get('[data-id="node_+1-null-source"]').then($source => {
      const sourceRect = $source[0].getBoundingClientRect();
      cy.get('[data-id="node_+2-null-target"]').then($target => {
        const targetRect = $target[0].getBoundingClientRect();
        cy.wrap($source)
          .trigger('mousedown', {
            button: 0,
            clientX: sourceRect.x + sourceRect.width / 2,
            clientY: sourceRect.y + sourceRect.height / 2,
            force: true
          });
        cy.wrap($target)
          .trigger('mousemove', {
            button: 0,
            clientX: targetRect.x + targetRect.width / 2,
            clientY: targetRect.y + targetRect.height / 2,
            force: true
          })
          .trigger('mouseup', {
            force: true
          });

          //=======================================
   

      });
    });

     cy.wait(1000);
  // Click Save
    cy.get('input[placeholder="Source Name"]').type("subset");
     cy.wait(1000);
     cy.get('input[placeholder="Add Description"]').type("demo");
    cy.wait(1000);
// If it's a native select
cy.get('select').eq(0).select('oracleforautomation');



cy.get('select').eq(1).select('test_user1');
 // Select ingestion type
    cy.get('input[value="subset"]').click();
    cy.wait(1000);
     cy.get('input[placeholder="Search datasets..."]').type('Ingestion');
    cy.get('input[type="checkbox"]').eq(0).click();
    cy.wait(1000);
    
    //Select dataset

    cy.get('select').eq(2).select('Postgresforautomation');
    cy.get('select').eq(3).select('public');


    cy.get('input[placeholder="Search datasets..."]').eq(1).click();
cy.get('input[placeholder="Search datasets..."]').eq(1).type('purgetarget');
 cy.wait(2000);
  cy.get('input#table-0').eq(1).click();
  cy.contains('button', 'OK').eq(0).click(); // index starts at 0

   cy.wait(1000);
   //cy.contains('button', 'OK').eq(1).scrollIntoView().click({ force: true });
   cy.get('button.bg-transparent.hover\\:bg-\\[\\#8e78b7\\].text-xs.text-gray-700.font-semibold.hover\\:text-white.py-2.px-10.border.border-gray-700.hover\\:border-transparent.rounded')
  .eq(3) // 0-based index for the 4th element
  .click();
 
    // Click Save
cy.wait(1000); 
cy.contains('button', 'Save').should('be.visible').click();

cy.wait(1000);
    cy.contains('button', 'Yes').click();
     cy.wait(1000);
     cy.scrollTo('bottom'); 
    cy.screenshot('Purge created Successfully');
  
  });
});
