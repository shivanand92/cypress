/*import credentials from '../../fixtures/login.json';

describe('Date Transformation', () => {

  let data;
  let dateData;

  before(() => {
    cy.fixture('etl/arithmetic').then((fixtureData) => {
      data = fixtureData;
    });

    cy.fixture('etl/Date').then((fixtureData) => {
      dateData = fixtureData;
    });
  });

  it('Create Date transformation using fixture data', () => {

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
      .select('default');

   cy.get('a[href="/transformation"]').click();




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
cy.contains('Select source type').click();
    cy.contains('Database').click({ force: true });

    cy.contains('Select connection').click();
    cy.get('input[placeholder="Search connections..."]')
      .type('Mssql_27');
    cy.contains('Mssql_27').click();

    cy.contains('Select schema').click();
    cy.get('input[placeholder="Search schemas..."]')
      .type('dbo');
    cy.contains('dbo').click();

    cy.contains('Select table').click();
    cy.get('input[placeholder="Search tables..."]')
      .type('MSSQL_SRC1');
    cy.contains('MSSQL_SRC1').click();

    cy.get('input[type="checkbox"]').first().click();

//=============================second connection
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
  .type('Mssql_27');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(1000);



// Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(6)   // 6th element
  .click({ force: true });


  cy.get('input[placeholder="Search schemas..."]')
  .click()
  .type('dbo');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
  cy.wait(9000);


  // Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(7)   // 6th element
  .click({ force: true });


  cy.get('input[placeholder="Search tables..."]')
  .click()
  .type('MSSQL_SRC2');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(2000);
cy.get('input[type="checkbox"]')
  .eq(7)   // 20th checkbox
  .click({ force: true });
            


  // ================= TARGET =================
  // Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(8)   // 6th element
  .click({ force: true });


  cy.get('input[placeholder="Search connections..."]')
  .click()
  .type('Join_postgres');
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
  .type('sales_data');
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(2000);


cy.wait(1000);
//  cy.contains('button', 'Transform').click();
cy.contains('button', 'Transform').realClick(); // true user-like click
cy.wait(3000);


// Find the <select> by its class and choose the option by visible text
cy.get('select.w-full.p-2.text-black.text-xs.border.border-gray-300.rounded.bg-white')
  .select('df_MSSQL_SRC1');


  //===============================================Opearatior selection=========================
cy.get('select.w-full.p-2.text-sm')
  .select('Join');
cy.wait(2000);
  // Step 1: Target the 2nd <select> (index 1 in 0-based Cypress)
cy.get('select.w-full.p-2.text-sm.bg-white.border.border-gray-300.rounded.text-gray-800.focus\\:ring-1.focus\\:ring-\\[\\#8E77BB\\].focus\\:border-\\[\\#8E77BB\\]')
  .eq(1)                      // second <select>
  .select('df_MSSQL_SRC2');    // visible text to select



  // Step 1: Target the 2nd <select> (index 1 in 0-based Cypress)
cy.get('select.w-full.p-2.text-sm.bg-white.border.border-gray-300.rounded.text-gray-800.focus\\:ring-1.focus\\:ring-\\[\\#8E77BB\\].focus\\:border-\\[\\#8E77BB\\]')
  .eq(2)                      // second <select>
  .select('Inner Join'); 

  cy.get('select.w-full.p-2.text-sm.bg-white.border.border-gray-300.rounded.text-gray-800.focus\\:ring-1.focus\\:ring-\\[\\#8E77BB\\].focus\\:border-\\[\\#8E77BB\\]')
  .eq(3)
  .select('CUSTOMER_ID', { force: true });



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

 });
  });*/

  //================================================================================

  import credentials from '../../fixtures/login.json';

describe('Date Transformation', () => {

  let joinData;

  before(() => {
    cy.fixture('etl/join').then((data) => {
      joinData = data;
    });
  });

  it('Create Join transformation using fixture data', () => {

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
    cy.get('select.w-44.text-slate-500').select('default');
   cy.get('a[href="/transformation"]').click();




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


    // ================= SOURCE 1 =================
    cy.contains('Select source type').click();
    cy.contains(joinData.source1.type).click({ force: true });

    cy.contains('Select connection').click();
    cy.get('input[placeholder="Search connections..."]').type(joinData.source1.connection);
    cy.contains(joinData.source1.connection).click();

    cy.contains('Select schema').click();
    cy.get('input[placeholder="Search schemas..."]').type(joinData.source1.schema);
    cy.contains(joinData.source1.schema).click();

    cy.contains('Select table').click();
    cy.get('input[placeholder="Search tables..."]').type(joinData.source1.table);
    cy.contains(joinData.source1.table).click();

    cy.get('input[type="checkbox"]').first().click();

    // ================= SOURCE 2 =================
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
  .type(joinData.source2.connection);
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(1000);



// Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(6)   // 6th element
  .click({ force: true });


  cy.get('input[placeholder="Search schemas..."]')
  .click()
  .type(joinData.source2.schema);
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
  cy.wait(9000);


  // Step 1: Click the 6th matching button (index starts from 0)
cy.get('button.w-full.p-1\\.5.text-\\[11px\\].bg-white.rounded-sm.border.border-gray-300.text-gray-800.text-left.flex.justify-between.items-center.focus\\:outline-none.focus\\:ring-1.focus\\:ring-gray-400.focus\\:border-gray-400.pr-8')
  .eq(7)   // 6th element
  .click({ force: true });


  cy.get('input[placeholder="Search tables..."]')
  .click()
  .type(joinData.source2.table);
  cy.get('div.p-2.text-\\[11px\\].text-black.cursor-pointer.hover\\:bg-gray-100').click();
cy.wait(2000);
cy.get('input[type="checkbox"]')
  .eq(7)   // 20th checkbox
  .click({ force: true });
            


    // ================= TARGET =================
    cy.get('button.w-full').eq(8).click({ force: true });
    cy.get('input[placeholder="Search connections..."]').type(joinData.target.connection);
    cy.contains(joinData.target.connection).click();

    cy.get('button.w-full').eq(9).click({ force: true });
    cy.get('input[placeholder="Search schemas..."]').type(joinData.target.schema);
    cy.contains(joinData.target.schema).click();

    cy.get('button.w-full').eq(10).click({ force: true });
    cy.get('input[placeholder="Search tables..."]').type(joinData.target.table);
    cy.contains(joinData.target.table).click();

    // ================= TRANSFORMATION =================
    cy.contains('button', 'Transform').realClick();
    cy.wait(3000);

    cy.get('select.w-full.p-2.text-black.text-xs').select(`df_${joinData.source1.table}`);

    cy.get('select.w-full.p-2.text-sm').select(joinData.join.operator);

    cy.get('select.w-full.p-2.text-sm').eq(1)
      .select(`df_${joinData.source2.table}`);

    cy.get('select.w-full.p-2.text-sm').eq(2)
      .select(joinData.join.joinType);

    cy.get('select.w-full.p-2.text-sm').eq(3)
      .select(joinData.source1.column, { force: true });

    cy.get('select.w-full.p-2.text-sm').eq(5)
      .select(joinData.source2.column, { force: true });

    cy.get('div.css-1y76x9s-control').first().click({ force: true });

    cy.get('div[id$="-listbox"]')
      .contains(new RegExp(`^${joinData.source1.column}$`, 'i'))
      .click({ force: true });

    cy.get('body').click();
  });
});
