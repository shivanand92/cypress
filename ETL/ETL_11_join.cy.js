/// <reference types="cypress" />

describe('Join Transformation', () => {
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


   // Drag source to the right side of define node
  cy.dragSource({x:900,y:120});
  cy.wait(1000);
  
  // Drag transformation node to canvas first
  cy.dragTransformation({x:50,y:800});
  cy.wait(1000);
  
  // Drag target node to canvas
  cy.dragTarget({x:1400,y:200});
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




  // Connect define node (right handle) to second source node (left handle)
cy.get('[data-id="node_0-null-source"]')
.trigger('mousedown', { button: 0, force: true })
.wait(200);

// Drag from define handle to second source handle
cy.get('[data-id="node_2-null-target"]')
.trigger('mousemove', { force: true })
.wait(200)
.trigger('mouseover', { force: true })
.wait(100)
.trigger('mouseup', { force: true });
cy.wait(1000);

//============================

 // Connect source node (right handle) to transformation node (left handle)
  cy.get('[data-id="node_1-null-source"]')
    .trigger('mousedown', { button: 0, force: true })
    .wait(200);
  
  // Drag from source handle to transformation handle
  cy.get('[data-id="node_3-null-target"]')
    .trigger('mousemove', { force: true })
    .wait(200)
    .trigger('mouseover', { force: true })
    .wait(100)
    .trigger('mouseup', { force: true });
  cy.wait(1000);

  // Connect second source node (right handle) to transformation node (left handle)
  cy.get('[data-id="node_2-null-source"]')
    .trigger('mousedown', { button: 0, force: true })
    .wait(200);
  
  // Drag from second source handle to transformation handle
  cy.get('[data-id="node_3-null-target"]')
    .trigger('mousemove', { force: true })
    .wait(200)
    .trigger('mouseover', { force: true })
    .wait(100)
    .trigger('mouseup', { force: true });
  cy.wait(1000);



  // Connect transformation node (right handle) to target node (left handle)
  cy.get('[data-id="node_3-null-source"]')
    .trigger('mousedown', { button: 0, force: true })
    .wait(200);
  
  // Drag from transformation handle to target handle
  cy.get('[data-id="node_4-null-target"]')
    .trigger('mousemove', { force: true })
    .wait(200)
    .trigger('mouseover', { force: true })
    .wait(100)
    .trigger('mouseup', { force: true });
  cy.wait(1000);

  //==================================First Source connection================================================


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
  .type('oracleetl');
 cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(1000);
 cy.get('button').contains('Select schema').click();
  cy.wait(1500);

  cy.get('input[placeholder="Search schemas..."]')
  .click()
  .type('dev_test');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();

cy.wait(1000);
 cy.get('button').contains('Select table').click();
  cy.wait(1500);

  cy.get('input[placeholder="Search tables..."]')
  .click()
  .type('SRC_SALES_DATA1');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();

cy.wait(1000);
  cy.get('input[type="checkbox"]').eq(0).click();
cy.wait(1000);

//=====================================first source connection over=================================
//=====================================Second source connection

  // Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(4)   // 6th element
  .click({ force: true });

// Step 2: From the dropdown, click the first matching option
cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100')
  .eq(0)   // first option
  .click({ force: true });


  // Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(5)   // 6th element
  .click({ force: true });


  cy.get('input[placeholder="Search connections..."]')
  .click()
  .type('oracleetl');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(1000);



// Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(6)   // 6th element
  .click({ force: true });



  cy.get('input[placeholder="Search schemas..."]')
  .click()
  .type('dev_test');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
  cy.wait(9000);


  // Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(7)   // 6th element
  .click({ force: true });


  cy.get('input[placeholder="Search tables..."]')
  .click()
  .type('SRC_CUSTOMER_DATA1');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(2000);
cy.get('input[type="checkbox"]')
  .eq(7)   // 20th checkbox
  .click({ force: true });
            



//=====================================Second source connection over=================================
   
   

// Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(8)   // 6th element
  .click({ force: true });


  cy.get('input[placeholder="Search connections..."]')
  .click()
  .type('Postgresforautomation');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(1000);



// Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(9)   // 6th element
  .click({ force: true });


  cy.get('input[placeholder="Search schemas..."]')
  .click()
  .type('public');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
  cy.wait(9000);


  // Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(10)   // 6th element
  .click({ force: true });

  cy.get('input[placeholder="Search tables..."]')
  .click()
  .type('tar_sales_customer_joined3');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(2000);


cy.contains('label', 'Select Source for Mapping')   // find the label
  .parent()                                        // move to parent <div>
  .find('select')                                  // find the <select> inside
  .select('df_SRC_CUSTOMER_DATA1')                         // select by visible text
  .should('have.value', 'node_2');   
  
 




  cy.wait(1000);
//  cy.contains('button', 'Transform').click();
cy.contains('button', 'Transform').realClick(); // true user-like click
cy.wait(3000);


// Find the <select> by its class and choose the option by visible text
cy.get('select.w-full.p-2.text-black.text-xs.border.border-gray-300.rounded.bg-white')
  .select('df_SRC_CUSTOMER_DATA1');


//===============================================Opearatior selection=========================
cy.get('select.w-full.p-2.text-sm')
  .select('Join');
cy.wait(2000);
  // Step 1: Target the 2nd <select> (index 1 in 0-based Cypress)
cy.get('select.w-full.p-2.text-sm.bg-white.border.border-gray-300.rounded.text-gray-800.focus\\:ring-1.focus\\:ring-\\[\\#8E77BB\\].focus\\:border-\\[\\#8E77BB\\]')
  .eq(1)                      // second <select>
  .select('df_SRC_SALES_DATA1');    // visible text to select



  // Step 1: Target the 2nd <select> (index 1 in 0-based Cypress)
cy.get('select.w-full.p-2.text-sm.bg-white.border.border-gray-300.rounded.text-gray-800.focus\\:ring-1.focus\\:ring-\\[\\#8E77BB\\].focus\\:border-\\[\\#8E77BB\\]')
  .eq(2)                      // second <select>
  .select('Inner Join'); 

  cy.get('select.w-full.p-2.text-sm.bg-white.border.border-gray-300.rounded.text-gray-800.focus\\:ring-1.focus\\:ring-\\[\\#8E77BB\\].focus\\:border-\\[\\#8E77BB\\]')
  .eq(3)
  .select('CUSTOMER_ID', { force: true });


 /*// open the 5th dropdown (index 4)
cy.get('select.w-full.p-2.text-sm.bg-white.border.border-gray-300.rounded.text-gray-800.focus\\:ring-1.focus\\:ring-\\[\\#8E77BB\\].focus\\:border-\\[\\#8E77BB\\]')
  .eq(4)
  .click({ force: true })                   // open the custom dropdown
  .then(() => {
    cy.contains('div', 'EQUAL(==)').click({ force: true });  // pick the option
  });*/


cy.get('select.w-full.p-2.text-sm.bg-white.border.border-gray-300.rounded.text-gray-800.focus\\:ring-1.focus\\:ring-\\[\\#8E77BB\\].focus\\:border-\\[\\#8E77BB\\]')
  .eq(5)
  .select('CUSTOMER_ID', { force: true });



  // 1️⃣ Click the first dropdown to open the list
cy.get('div.css-1y76x9s-control')
  .first()                           // first dropdown
  .click({ force: true });

// 2️⃣ Wait for the listbox to be attached and visible
cy.get('div[id^="react-select-"][id$="-listbox"]', { timeout: 10000 })
  .should('be.visible')               // make sure it has appeared
  .within(() => {
    // 3️⃣ Find the option that contains the exact text 'id' and click it
    cy.contains('div', /^CUSTOMER_ID$/i).click({ force: true });
  });


  cy.get('body').click();


  /*  // 1️⃣ Click the first dropdown to open the list
cy.get('div.css-1y76x9s-control')
  .last()                           // first dropdown
  .click({ force: true });

// 2️⃣ Wait for the listbox to be attached and visible
cy.get('div[id^="react-select-"][id$="-listbox"]', { timeout: 10000 })
  .should('be.visible')               // make sure it has appeared
  .within(() => {
    // 3️⃣ Find the option that contains the exact text 'id' and click it
    cy.contains('div', /^Trim$/i).click({ force: true });
  });


  cy.get('body').click();*/

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
  cy.wrap(scrollable).scrollTo('50%', 0, { duration: 600 });
});


    });
});