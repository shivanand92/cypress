/// <reference types="cypress" />

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
  cy.wait(9000);
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
  .select('String');

cy.wait(2000);
cy.get('div.text-sm.css-b62m3t-container')
  .eq(0)
  .click()
  .type('CUSTOMER_NAME');

  cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^CUSTOMER_NAME\b/i)
  .click({ force: true });

//==============================================Left pad=============================================
// Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(1)
  .click()
  .type('Left Pad', { delay: 100 });

// Select "Left Pad" from the dropdown options
cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^Left Pad\b/i)
  .click({ force: true });

cy.get('input[type="number"]')
  .click()
  .type('5');

  cy.get('input.w-full.p-2.text-sm')
  .eq(1)    // (2nd element, since index starts at 0)
  .click()
  .type('*');

  // Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(2) // 2nd element (index starts at 0)
  .click()
  .type('Add new +', { delay: 100 });

cy.get('div[id^="react-select-"][id$="-listbox"]')
  .last()
  .within(() => {
    cy.contains('div', 'Add New +').click({ force: true });
  });

cy.wait(1000);
  cy.get('input[placeholder="Enter new column name"]')
  .eq(0)   // first input
  .type('leftpad', { force: true });

  cy.contains('button', 'OK').first().click({ force: true });
cy.wait(1000);
//==============================================Right pad================================================
// Click the button by its text
cy.contains('button', 'Add Transformation')
  .should('be.visible') // optional, ensures the button is visible
  .click();

cy.wait(1000);
// Wait for dropdown to be ready
cy.wait(1000);

// Select the second dropdown and choose the option by value or visible text
cy.get("select.w-full.p-2.text-black.text-xs.border.border-gray-300.rounded.bg-white")
  .eq(1) // second <select> (0-based index)
  .select("df_SHIVA_SRC1"); // or .select(df_SHIVA_SRC1) if it's a variable

cy.get("select.bg-white.rounded.text-gray-800")
  .eq(1)
  .select("String");

cy.get('div.text-sm.css-b62m3t-container')
  .eq(3)
  .click()
  .type('CUSTOMER_NAME');

  cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^CUSTOMER_NAME\b/i)
  .click({ force: true });

   // Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(4)
  .click()
  .type('Right Pad', { delay: 100 });

// Select "Left Pad" from the dropdown options
cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^Right Pad\b/i)
  .click({ force: true });

 cy.get('input[type="number"]')
  .eq(1) // targets the second input
  .click()
  .type('5');

cy.get('input.w-full.p-2.text-sm')
  .eq(2)    // (2nd element, since index starts at 0)
  .click()
  .type('$');

  // Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(5) // 2nd element (index starts at 0)
  .click()
  .type('Add new +', { delay: 100 });

cy.get('div[id^="react-select-"][id$="-listbox"]')
  .last()
  .within(() => {
    cy.contains('div', 'Add New +').click({ force: true });
  });


cy.wait(1000);
  cy.get('input[placeholder="Enter new column name"]')
  .eq(0)   // first input
  .type('rightpad', { force: true });

  cy.contains('button', 'OK').first().click({ force: true });
cy.wait(1000);


//=============================================substring=====================================
// Click the button by its text
cy.contains('button', 'Add Transformation')
  .should('be.visible') // optional, ensures the button is visible
  .click();

cy.wait(1000);
// Wait for dropdown to be ready
cy.wait(1000);

// Select the second dropdown and choose the option by value or visible text
cy.get("select.w-full.p-2.text-black.text-xs.border.border-gray-300.rounded.bg-white")
  .eq(2) // second <select> (0-based index)
  .select("df_SHIVA_SRC1"); // or .select(df_SHIVA_SRC1) if it's a variable

cy.get("select.bg-white.rounded.text-gray-800")
  .eq(2)
  .select("String");

cy.get('div.text-sm.css-b62m3t-container')
  .eq(6)
  .click()
  .type('CUSTOMER_NAME');

  cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^CUSTOMER_NAME\b/i)
  .click({ force: true });

   // Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(7)
  .click()
  .type('Substring', { delay: 100 });

// Select "Left Pad" from the dropdown options
cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^Substring\b/i)
  .click({ force: true });

 cy.get('input.w-full.p-2')
  .eq(4) // index starts at 0, so 4 = 5th element
  .click()
  .type('1');

  cy.get('input.w-full.p-2')
  .eq(5)   // 6th element (index starts at 0)
  .click()
  .type('5');




  // Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(8) // 2nd element (index starts at 0)
  .click()
  .type('Add new +', { delay: 100 });

cy.get('div[id^="react-select-"][id$="-listbox"]')
  .last()
  .within(() => {
    cy.contains('div', 'Add New +').click({ force: true });
  });


cy.wait(1000);
  cy.get('input[placeholder="Enter new column name"]')
  .eq(0)   // first input
  .type('sunstring', { force: true });

  cy.contains('button', 'OK').first().click({ force: true });
cy.wait(1000);

//============================================================================================

//===============================================Trim===============================================
// Click the button by its text
cy.contains('button', 'Add Transformation')
  .should('be.visible') // optional, ensures the button is visible
  .click();

cy.wait(1000);
// Wait for dropdown to be ready
cy.wait(1000);

// Select the second dropdown and choose the option by value or visible text
cy.get("select.w-full.p-2.text-black.text-xs.border.border-gray-300.rounded.bg-white")
  .eq(3) // second <select> (0-based index)
  .select("df_SHIVA_SRC1"); // or .select(df_SHIVA_SRC1) if it's a variable

cy.get("select.bg-white.rounded.text-gray-800")
  .eq(3)
  .select("String");

cy.get('div.text-sm.css-b62m3t-container')
  .eq(9)
  .click()
  .type('CUSTOMER_NAME');

  cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^CUSTOMER_NAME\b/i)
  .click({ force: true });


   // Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(10)
  .click()
  .type('Trim', { delay: 100 });

  cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^Trim\b/i)
  .click({ force: true });


// Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(11) // 2nd element (index starts at 0)
  .click()
  .type('Add new +', { delay: 100 });

cy.get('div[id^="react-select-"][id$="-listbox"]')
  .last()
  .within(() => {
    cy.contains('div', 'Add New +').click({ force: true });
  });


cy.wait(1000);
  cy.get('input[placeholder="Enter new column name"]')
  .eq(0)   // first input
  .type('trim', { force: true });

  cy.contains('button', 'OK').first().click({ force: true });
cy.wait(1000);


//===============================================Trim over========================================

//==============================================Concate============================================

/*// Click the button by its text
cy.contains('button', 'Add Transformation')
  .should('be.visible') // optional, ensures the button is visible
  .click();

cy.wait(1000);
// Select the second dropdown and choose the option by value or visible text
cy.get("select.w-full.p-2.text-black.text-xs.border.border-gray-300.rounded.bg-white")
  .eq(4) // second <select> (0-based index)
  .select("df_SHIVA_SRC1"); // or .select(df_SHIVA_SRC1) if it's a variable

cy.get("select.bg-white.rounded.text-gray-800")
  .eq(4)
  .select("String");



  /*cy.get('div.text-sm.css-b62m3t-container')
  .eq(12)
  .click()
  .type('CUSTOMER_NAME');

  cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^CUSTOMER_NAME\b/i)
  .click({ force: true });

   cy.get('div.text-sm.css-b62m3t-container')
  .eq(12)
  .click()
  .type('PAYMENT_MODE');
cy.wait(1000);
  cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^PAYMENT_MODE\b/i)
  .click({ force: true });*/

/*const values = ['CUSTOMER_NAME', 'PAYMENT_MODE'];

values.forEach((val) => {
  // Always click container to place cursor after the last chip
  cy.get('div.text-sm.css-b62m3t-container')
    .eq(12)
    .click();

  // Find the *last input* (always after last chip)
  cy.get('div.text-sm.css-b62m3t-container')
    .eq(12)
    .find('input')
    .last()
    .type(val, { force: true });

  // Select from dropdown
  cy.get('div[class*="-menu"]', { timeout: 6000 })
    .last()
    .contains('div[class*="-option"]', val)
    .click({ force: true });

  // Verify chip is present
  cy.get('div.text-sm.css-b62m3t-container')
    .eq(12)
    .should('contain.text', val);
});


    // Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(13)
  .click()
  .type('Concat', { delay: 100 });

  cy.get('div[class*="-menu"] div[class*="-option"]', { timeout: 6000 })
  .contains(/^Concat\b/i)
  .click({ force: true });

  cy.wait(1000)  ;
  // Click and type into the input field with placeholder
cy.get('input[placeholder="Enter character"]')
  .click()
  .type('test');


  // Open the 2nd dropdown and type the value
cy.get('div.text-sm.css-b62m3t-container')
  .eq(14) // 2nd element (index starts at 0)
  .click()
  .type('Add new +', { delay: 100 });

cy.get('div[id^="react-select-"][id$="-listbox"]')
  .last()
  .within(() => {
    cy.contains('div', 'Add New +').click({ force: true });
  });


cy.wait(1000);
  cy.get('input[placeholder="Enter new column name"]')
  .eq(0)   // first input
  .type('concate', { force: true });

  cy.contains('button', 'OK').first().click({ force: true });
cy.wait(1000);*/

//==============================================Concate over=====================================
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
});
