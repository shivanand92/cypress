/*/// <reference types="cypress" />

describe('Login page', () => {
  let credentials;

  before(() => {
    // Load the login.json file from ETL folder
    cy.fixture('ETL/login').then((data) => {
      credentials = data;
    });
  });

  it('Logs into Tantor portal and performs migration creation', function () {
    Cypress.on('uncaught:exception', () => false);

    cy.visit(credentials.url, {
      failOnStatusCode: false,
    });

    cy.get('#username', { timeout: 10000 })
      .should('be.visible')
      .type(credentials.username);

    cy.get('#password')
      .should('be.visible')
      
      .type(credentials.password);

    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    cy.get('a[href="/dashboard"]').click();
    cy.wait(2000);
 cy.wait(1000);
    // Go to Connections
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);
    // Open dropdown and select connection type
    cy.get('select.w-44.text-slate-500').select('shiva');
    cy.wait(1000);

    cy.get('a[href="/transformation"]').click();
    cy.wait(1000);
//====================================================================================================    
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
  
  // Select Database as source type
  cy.get('button').contains('Select source type').click();
  cy.wait(1500);
  
  // Try multiple approaches to select Database
  cy.get('body').then(($body) => {
    if ($body.find('div[role="option"]:contains("Database")').length > 0) {
      cy.get('div[role="option"]').contains('Database').click({ force: true });
    } else if ($body.find('li:contains("Database")').length > 0) {
      cy.get('li').contains('Database').click({ force: true });
    } else if ($body.find('option:contains("Database")').length > 0) {
      cy.get('option').contains('Database').click({ force: true });
    } else if ($body.find('[data-value="Database"]').length > 0) {
      cy.get('[data-value="Database"]').click({ force: true });
    } else {
      // Try clicking by text content
      cy.contains('Database').click({ force: true });
    }
  });
  cy.wait(1000);
  
  // Select connection name - TestingOracle(oracle)
  cy.get('button').contains('Select connection').click();
  cy.wait(1500);
  
  // Click and type using attribute selector
cy.get('input[placeholder="Search connections..."]')
  .click()
  .type('TestingOracle');
 cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();

cy.wait(1000);
 cy.get('button').contains('Select schema').click();
  cy.wait(1500);

  cy.get('input[placeholder="Search schemas..."]')
  .click()
  .type('test_user1');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();

cy.wait(1000);
 cy.get('button').contains('Select table').click();
  cy.wait(1500);

  cy.get('input[placeholder="Search tables..."]')
  .click()
  .type('SHIVA_SRC1');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();

cy.wait(1000);
  cy.get('input[type="checkbox"]').eq(0).click();
cy.wait(1000);
  cy.contains('button', 'Select connection').click();
  cy.get('input[placeholder="Search connections..."]')
  .click()
  .type('Postgresforautomation');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(1000);
cy.contains('button', 'Select schema').click();
  cy.get('input[placeholder="Search schemas..."]')
  .click()
  .type('public');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
  cy.wait(5000);
cy.contains('button', 'Select table').click();
  cy.get('input[placeholder="Search tables..."]')
  .click()
  .type('shiva_tar2');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(2000);
cy.contains('label', 'Select Source for Mapping')   // find the label
  .parent()                                        // move to parent <div>
  .find('select')                                  // find the <select> inside
  .select('df_SHIVA_SRC1')                         // select by visible text
  .should('have.value', 'node_1');                 // assert correct value

cy.wait(2000);
//  cy.contains('button', 'Transform').click();
cy.contains('button', 'Transform').realClick(); // true user-like click
cy.wait(2000);

//===============================================Opearatior selection=========================
cy.get('select.w-full.p-2.text-sm')
  .select('Sort');
cy.wait(2000);
  cy.contains('span', 'Add Column to Sort By').click();
cy.wait(2000);
cy.contains('button', 'ID').click();

cy.wait(2000);
cy.get('button.px-2.py-1.rounded.text-xs.font-medium.bg-blue-100.text-blue-700').click();  // ASC    when we need DSc click here

//cy.wait(2000);
//cy.get('button.px-2.py-1.rounded.text-xs.font-medium.bg-purple-100.text-purple-700').click();  // DSC  when we need ASC click here






  cy.contains('button', 'Apply').first().click({ force: true });
cy.wait(1000);
cy.contains('button', 'Target Mapping').click({ force: true });

cy.wait(1000);
cy.contains('button', 'Confirm Mapping').click({ force: true });
cy.wait(1000);
cy.get('input.form-checkbox').first().click({ force: true });
cy.wait(1000);
cy.contains('button', 'Save').click();

cy.wait(500);
cy.screenshot('Transformation saved successfully');
//==============================================================================================================================

cy.scrollTo('bottom');

cy.wait(2000);
cy.reload();
cy.wait(7000);
cy.scrollTo('bottom');
cy.reload();
cy.wait(2000);
cy.reload();
cy.wait(2000);
cy.scrollTo('bottom');
cy.wait(2000);
cy.reload();
cy.wait(4000);
cy.reload();
cy.scrollTo('bottom');
cy.wait(4000);
cy.scrollTo('bottom');

cy.get('button[aria-label="Open actions menu"]').first().click();
cy.wait(1000);
cy.get('button[aria-label="Run"]').click();
cy.wait(1000);
cy.reload();
cy.wait(12000);
cy.reload();
cy.wait(14000);
cy.reload();
cy.wait(4000);
cy.reload();
cy.wait(6000);
cy.reload();
cy.wait(7000);
cy.reload();
cy.wait(4000);
cy.reload();
cy.wait(2000);
cy.reload();
cy.wait(2000);
cy.reload();
cy.wait(2000);
cy.reload();
cy.wait(3000);
cy.reload();
cy.scrollTo('bottom');
cy.wait(1000);


//=================================================================================================
cy.wait(1000);

cy.get('a[href="/federation"]').click();
    cy.wait(1000);
 
    // Step 3: Click on the first 'flex justify-between' div
    //cy.get('(//div[@class="flex justify-between"])[1]').click();
    //cy.wait(1000);
// Scroll to the element before clicking
cy.get('div.flex.justify-between').first().scrollIntoView().should('be.visible').click();
cy.wait(1000);
 
    // Step 4: Focus ACE editor
    cy.get('div.ace_content').click();
 
    // Step 5: Type into the hidden textarea used by ACE editor
    cy.get('textarea.ace_text-input').type('SELECT * FROM "Postgresforautomation"."public"."shiva_tar2";');
    cy.wait(1000);
    //cy.get('div.flex.justify-between.items-center').click({ force: true });
    cy.contains('button', 'Run').click({ force: true });
    cy.wait(1000);
    
    cy.screenshot('Quarry executed successfully');

// scroll the output area into view first
cy.contains('Output').scrollIntoView();

// find the scrollable element under the Output container and scroll it right
cy.contains('Output').parent().find('div').then($divs => {
  const scrollable = [...$divs].find(d => d.scrollWidth > d.clientWidth);
  if (!scrollable) {
    throw new Error('No horizontal-scrollable element found under Output');
  }
  cy.wrap(scrollable).scrollTo('25%', 0, { duration: 600 });
});

});
});*/




//============================================================================================
/// <reference types="cypress" />

describe('Sort Transformation', () => {
  let credentials;
  let sortData;

  before(() => {
    // Load login.json and sort.json
    cy.fixture('ETL/login').then((data) => {
      credentials = data;
    });
    cy.fixture('ETL/sort').then((data) => {
      sortData = data;
    });
  });

  it('Logs into Tantor portal and performs migration creation', function () {
    Cypress.on('uncaught:exception', () => false);

    cy.visit(credentials.url, { failOnStatusCode: false });

    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    cy.get('a[href="/dashboard"]').click();
    cy.wait(2000);

    // Go to Connections
    cy.get('a[href="/connections"]').click();
    cy.wait(1000);
    cy.get('select.w-44.text-slate-500').select('shiva');

    // Go to Transformation
    cy.get('a[href="/transformation"]').click();
    cy.wait(1000);

    // Add new transformation
    cy.get('button.bg-\\[\\#8d77ba\\]').click();

    // Zoom out
    for (let i = 0; i < 8; i++) {
      cy.get('button.react-flow__controls-button.react-flow__controls-zoomout').click();
      cy.wait(200);
    }

    // Place source, transformation, target
    cy.dragSource({ x: 400, y: 20 });
    cy.dragTransformation({ x: 50, y: 800 });
    cy.dragTarget({ x: 700, y: 400 });

    // Connect nodes
    cy.get('[data-id="node_0-null-source"]').trigger('mousedown', { button: 0, force: true });
    cy.get('[data-id="node_1-null-target"]').trigger('mousemove').trigger('mouseup', { force: true });

    cy.get('[data-id="node_1-null-source"]').trigger('mousedown', { button: 0, force: true });
    cy.get('[data-id="node_2-null-target"]').trigger('mousemove').trigger('mouseup', { force: true });

    cy.get('[data-id="node_2-null-source"]').trigger('mousedown', { button: 0, force: true });
    cy.get('[data-id="node_3-null-target"]').trigger('mousemove').trigger('mouseup', { force: true });

    // Select Database as source type
    cy.contains('button', 'Select source type').click();
    cy.contains('Database').click({ force: true });

    // Source connection
    cy.contains('button', 'Select connection').click();
    cy.get('input[placeholder="Search connections..."]').click().type(sortData.sourceConnection);
    cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer').click();

    // Source schema
    cy.contains('button', 'Select schema').click();
    cy.get('input[placeholder="Search schemas..."]').click().type(sortData.sourceSchema);
    cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer').click();

    // Source table
    cy.contains('button', 'Select table').click();
    cy.get('input[placeholder="Search tables..."]').click().type(sortData.sourceTable);
    cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer').click();

    cy.get('input[type="checkbox"]').eq(0).click();

    // Target connection
    cy.contains('button', 'Select connection').click();
    cy.get('input[placeholder="Search connections..."]').click().type(sortData.targetConnection);
    cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer').click();

    // Target schema
    cy.contains('button', 'Select schema').click();
    cy.get('input[placeholder="Search schemas..."]').click().type(sortData.targetSchema);
    cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer').click();

    // Target table
    cy.contains('button', 'Select table').click();
    cy.get('input[placeholder="Search tables..."]').click().type(sortData.targetTable);
    cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer').click();

    // Mapping
    cy.contains('label', 'Select Source for Mapping').parent().find('select')
      .select(sortData.sourceAlias).should('have.value', 'node_1');

    // Open Transform
    cy.contains('button', 'Transform').realClick();

    // Operator selection
    cy.get('select.w-full.p-2.text-sm').select(sortData.operator);
    cy.contains('span', 'Add Column to Sort By').click();
    cy.contains('button', sortData.column).click();

    // Order selection
    if (sortData.order === 'ASC') {
      cy.get('button.bg-blue-100.text-blue-700').click();
    } else {
      cy.get('button.bg-purple-100.text-purple-700').click();
    }

    // Apply transformation
    cy.contains('button', 'Apply').first().click();
    cy.contains('button', 'Target Mapping').click();
    cy.contains('button', 'Confirm Mapping').click();
    cy.get('input.form-checkbox').first().click();
    cy.contains('button', 'Save').click();
    cy.wait(2000);
    cy.screenshot('Transformation saved successfully');

    // ==================================================================================
    // SCROLL + RELOAD LOOP (your missed block)
    // ==================================================================================
    cy.scrollTo('bottom');
    cy.wait(2000);
    cy.reload();
    cy.wait(7000);
    cy.scrollTo('bottom');
    cy.reload();
    cy.wait(2000);
    cy.reload();
    cy.wait(2000);
    cy.scrollTo('bottom');
    cy.wait(2000);
    cy.reload();
    cy.wait(4000);
    cy.reload();
    cy.scrollTo('bottom');
    cy.wait(4000);
    cy.scrollTo('bottom');
    cy.reload();
    cy.wait(4000);
    cy.scrollTo('bottom');
     cy.wait(4000);
    cy.scrollTo('bottom');
    cy.reload();
    cy.scrollTo('bottom');
    cy.get('button[aria-label="Open actions menu"]').first().click();
    cy.wait(1000);
    cy.get('button[aria-label="Run"]').click();
    cy.wait(1000);
    cy.reload();
    cy.wait(12000);
    cy.reload();
    cy.wait(14000);
    cy.reload();
    cy.wait(4000);
    cy.reload();
    cy.wait(6000);
    cy.reload();
    cy.wait(7000);
    cy.reload();
    cy.wait(4000);
    cy.reload();
    cy.wait(2000);
    cy.reload();
    cy.wait(2000);
    cy.reload();
    cy.wait(2000);
    cy.reload();
    cy.wait(3000);
    cy.reload();
    cy.scrollTo('bottom');
    cy.wait(1000);

    // ==================================================================================
    // Federation -> Run query
    // ==================================================================================
    cy.get('a[href="/federation"]').click();
    cy.get('div.flex.justify-between').first().scrollIntoView().click();
    cy.get('div.ace_content').click();
    cy.get('textarea.ace_text-input')
      .type(`SELECT * FROM "${sortData.targetConnection}"."${sortData.targetSchema}"."${sortData.targetTable}";`);
    cy.contains('button', 'Run').click();
    cy.wait(2000);
    cy.screenshot('Query executed successfully');

    
    
  });
});





