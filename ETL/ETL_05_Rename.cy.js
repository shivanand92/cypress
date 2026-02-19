
//=====================================================================

import credentials from '../../fixtures/login.json';

describe('Rename Transformation', () => {

  let data;
  let renameData;

  before(() => {
    cy.fixture('etl/arithmetic').then((fixtureData) => {
      data = fixtureData;
    });

    cy.fixture('etl/Rename').then((fixtureData) => {
      renameData = fixtureData;
    });
  });

  it('Create Rename transformation using fixture data', () => {

    // ================= LOGIN =================
    cy.visit(credentials.URL);

    cy.origin(
      credentials.KEYCLOAK_URL,
      { args: credentials },
      ({ username, password }) => {
        cy.get('#username', { timeout: 20000 }).type(username);
        cy.get('#password').type(password);
        cy.get('input[value="Sign In"]').click();
      }
    );

    cy.url({ timeout: 20000 }).should('include', '/dashboard');

    // ================= NAVIGATION =================
    cy.get('a[href="/connections"]').click();
    cy.get('select.w-44.text-slate-500')
      .select(data.connectionType);

     cy.get('a[href="/transformation"]').click();

    cy.get('button.bg-\\[\\#8d77ba\\]').click();
    cy.wait(1000);
    // Zoom out more to make all transformation nodes visible
    for (let i = 0; i < 8; i++) {
      cy.get('button.react-flow__controls-button.react-flow__controls-zoomout').click();
      cy.wait(200); // Small wait between zoom clicks
    }
  // Drag source to the right side of define node
  cy.dragSource({x:400,y:20});
  cy.wait(1000);
  
  // Drag transformation node to canvas first
  cy.dragTransformation({x:50,y:800});
  cy.wait(1000);
  
  // Drag target node to canvas
  cy.dragTarget({x:700,y:400});
  cy.wait(1000);
  
  // Connect define node (right handle) to source node (left handle)
  cy.get('[data-id="node_0-null-source"]')
    .trigger('mousedown', { button: 0, force: true })
    .wait(200);
  
  // Drag from define handle to source handle
  cy.get('[data-id="node_1-null-target"]')
    .trigger('mousemove', { force: true })
    .wait(200)
    .trigger('mouseover', { force: true })
    .wait(100)
    .trigger('mouseup', { force: true });
  cy.wait(1000);
  
  // Connect source node (right handle) to transformation node (left handle)
  cy.get('[data-id="node_1-null-source"]')
    .trigger('mousedown', { button: 0, force: true })
    .wait(200);
  
  // Drag from source handle to transformation handle
  cy.get('[data-id="node_2-null-target"]')
    .trigger('mousemove', { force: true })
    .wait(200)
    .trigger('mouseover', { force: true })
    .wait(100)
    .trigger('mouseup', { force: true });
  cy.wait(1000);
  
  // Connect transformation node (right handle) to target node (left handle)
  cy.get('[data-id="node_2-null-source"]')
    .trigger('mousedown', { button: 0, force: true })
    .wait(200);
  
  // Drag from transformation handle to target handle
  cy.get('[data-id="node_3-null-target"]')
    .trigger('mousemove', { force: true })
    .wait(200)
    .trigger('mouseover', { force: true })
    .wait(100)
    .trigger('mouseup', { force: true });
  cy.wait(1000);
  
   

    // ================= SOURCE =================
    cy.contains('Select source type').click();
    cy.contains('Database').click({ force: true });

    cy.contains('Select connection').click();
    cy.get('input[placeholder="Search connections..."]')
      .type(data.source.connection);
    cy.contains(data.source.connection).click();

    cy.contains('Select schema').click();
    cy.get('input[placeholder="Search schemas..."]')
      .type(data.source.schema);
    cy.contains(data.source.schema).click();

    cy.contains('Select table').click();
    cy.get('input[placeholder="Search tables..."]')
      .type(data.source.table);
    cy.contains(data.source.table).click();

    cy.get('input[type="checkbox"]').first().click();

    // ================= TARGET =================
  cy.contains('button', 'Select connection').click();
  cy.get('input[placeholder="Search connections..."]')
  .click()
  .type(data.target.connection1);
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();


  cy.wait(1000);
cy.contains('button', 'Select schema').click();
  cy.get('input[placeholder="Search schemas..."]')
  .click()
  .type(data.target.schema1);
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
  cy.wait(3000);
cy.contains('button', 'Select table').click();
  cy.get('input[placeholder="Search tables..."]')
  .click()
  .type(data.target.table1);
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(2000);

  //====================================
    
    // ================= MAPPING =================
    cy.contains('label', 'Select Source for Mapping')
      .parent()
      .find('select')
      .select(data.source.mappingSource);

   
    cy.contains('button', 'Transform').realClick();
    cy.wait(2000);
    // ================= RENAME TRANSFORMATION =================
    cy.get('select.w-full.p-2.text-sm')
      .select(renameData.operator);

    cy.get('div.css-1y76x9s-control')
      .click({ force: true });

   /* cy.get('input[id*="react-select"][id$="-input"]')  // finds react-select input reliably
  .type(renameData.existingname, { force: true });
  cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^renameData.existingname\b/i)
  .click({ force: true });*/
  

  // Open dropdown input
cy.get('input[id*="react-select"][id$="-input"]')
  .should('be.visible')
  .clear()
  .type(renameData.existingname, { force: true });

// Select from dropdown
cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 8000 })
  .should('be.visible')
  .contains(new RegExp(`^${renameData.existingname}\\b`, 'i'))
  .scrollIntoView()
  .click({ force: true });


    

   cy.get('input.w-full.p-2.text-sm')
  .should('be.visible')
  .click()
  .type(renameData.namechangeto);





  // Apply
    cy.contains('button', 'Apply')
      .should('be.enabled')
      .click();




          cy.contains('Target Mapping').click();
    cy.wait(1000);


    cy.contains('button', 'Confirm Mapping').click({ force: true });
cy.wait(1000);
cy.get('input.form-checkbox').first().click({ force: true });
cy.wait(1000);
cy.contains('button', 'Save').click();
cy.wait(2000);

    // Function to check first row status
const checkFirstRowStatus = () => 
  cy.get('table tbody tr').first().find('td').eq(5).find('span');

// Retry mechanism with reload
const waitForReadyToRun = (timeout = 60000, interval = 5000) => {
  const start = Date.now();

  const check = () => {
    checkFirstRowStatus().then($span => {
      if ($span.text().trim() === 'Ready to run') {
        cy.log('Status is Ready to run ✅');
        return;
      }

      if (Date.now() - start > timeout) {
        throw new Error('Timeout: Status did not become Ready to run');
      }

      cy.wait(interval); // wait before reload
      cy.reload();
      check(); // recursive check
    });
  };

  check();
};

// Use the function in your test
waitForReadyToRun(280000, 4000); // wait up to 2 mins, refresh every 4s



cy.wait(3000); 
cy.reload();



cy.get('button[aria-label="Open actions menu"]').first().click();
cy.wait(1000);
cy.get('button[aria-label="Run"]').click();
cy.wait(1000);

const maxRetries = 60;
let attempts = 0;

const checkStatus = () => {
  attempts++;

  cy.reload(); // refresh the page
  cy.wait(2000); // wait for reload

  // Use contains inside first row for reliability
  cy.get("table tbody tr").eq(0).find("td").eq(5).find("span")
    .should("exist") // make sure span exists
    .invoke("text")
    .then((status) => {
      const trimmedStatus = status.trim();
      cy.log("🔍 Current Status: " + trimmedStatus);

      if (trimmedStatus === "Success") {
        cy.log("✅ Status is Success!");
      } else if (attempts < maxRetries) {
        cy.log(`⏳ Status not Success yet, retrying (${attempts})...`);
        cy.wait(2000).then(checkStatus);
      } else {
        throw new Error(" Timeout: Status did not become Success within max retries");
      }
    });
};

// Usage in your test after triggering the ETL/purge
checkStatus();

  });
});

