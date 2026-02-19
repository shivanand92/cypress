import credentials from '../../fixtures/login.json';
import Homepage from '../../fixtures/Lineage/Homepage.json';

describe('visualize page', () => {
  it('Logs into Tantor portal via Keycloak and selects dropdown values', () => {
    
    cy.visit(credentials.URL);

    
    cy.origin(credentials.KEYCLOAK_URL, { args: credentials }, ({ username, password }) => {
      cy.get('#username', { timeout: 20000 }).should('be.visible').type(username);
      cy.get('#password').should('be.visible').type(password);
      cy.get('input[value="Sign In"]').click();
    });

    
    cy.contains('Data Governance', { timeout: 20000 }).should('be.visible').click();
    cy.wait(2000);

    cy.get('button.p-1.hover\\:bg-gray-200.rounded-full.transition-transform.duration-300')
      .eq(1)
      .click();

    cy.wait(1000);
    cy.get('a[href="/datagovernance/data-assurance/lineage"]').click();
    cy.wait(2000);

 
cy.get('.mt-1.flex.justify-between.items-center.w-full.px-4.py-2.bg-white.border.rounded-md.shadow-sm.text-left')
  .first()
  .click();

//==========================================For Database selection=================================
Homepage.Databases.forEach((value) => {
  cy.get('input[placeholder="Search..."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(value, { delay: 100 });

  cy.contains(value, { matchCase: false })
    .should('be.visible')
    .first()
    .click({ force: true });

  cy.log(` Selected: ${value}`);
  cy.wait(500);
});
cy.get('body').click(0, 0); 
//===========================================Database over=========================================
cy.get('.mt-1.flex.justify-between.items-center.w-full.px-4.py-2.bg-white.border.rounded-md.shadow-sm.text-left')
  .eq(1) 
  .click();
 cy.wait(500);
//========================================Connection Selection====================================
  Homepage.Connections.forEach((value) => {
  cy.get('input[placeholder="Search..."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(value, { delay: 100 });

  
  cy.contains(value, { matchCase: false })
    .should('be.visible')
    .first()
    .click({ force: true });

  cy.log(`Selected: ${value}`);
  cy.wait(500);
});
cy.get('body').click(0, 0); 
//========================================Connections Over=========================================
cy.get('.mt-1.flex.justify-between.items-center.w-full.px-4.py-2.bg-white.border.rounded-md.shadow-sm.text-left')
  .eq(2) 
  .click();

  cy.wait(500);

//==========================================Schema Selection=============================================
 Homepage.schemas.forEach((value) => {
cy.get('input[placeholder="Search..."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(value, { delay: 100 });

  
  cy.contains(value, { matchCase: false })
    .should('be.visible')
    .first()
    .click({ force: true });

  
  cy.log(`Selected: ${value}`);


  cy.wait(500);
});
cy.get('body').click(0, 0); 

//====================================Schemas Over====================================================
cy.get('.mt-1.flex.justify-between.items-center.w-full.px-4.py-2.bg-white.border.rounded-md.shadow-sm.text-left')
  .eq(3) 
  .click();

  cy.wait(500);

//===================================Type Selection==================================================

Homepage.Types.forEach((value) => {
  cy.get('input[placeholder="Search..."]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(value, { delay: 100 });

 
  cy.contains(value, { matchCase: false })
    .should('be.visible')
    .first()
    .click({ force: true });

  
  cy.log(`Selected: ${value}`);
  cy.wait(500);
});
cy.get('body').click(0, 0); 

//===========================================Type Over==========================================
cy.contains('button', 'Show Data').click();
cy.wait(1000);
cy.screenshot('Lineage details displayed successfully');
cy.wait(1000);

cy.get('input[placeholder="Search in table..."]').type(Homepage.searchValue[0]);
// scroll the table to right side 
cy.get('div.overflow-x-auto').scrollTo('right', { duration: 800 });

cy.wait(1000);
// Locate the search input and clear any existing text
cy.get('input[placeholder="Search in table..."]').clear();

cy.scrollTo(0, 300);


//====================================== Clicking on the Lineage(+) icon ======================================================
cy.wait(1000);
cy.scrollTo(300,0);
//cy.get('input[placeholder="Search in table..."]').type(Homepage.searchValue);
cy.get('input[placeholder="Search in table..."]').type(Homepage.searchValue[0]);
// scroll the table to right side 
cy.get('div.overflow-x-auto').scrollTo('right', { duration: 800 });


cy.get('button[title="Add to Lineage"]').eq(0).click();


cy.contains('button', 'Visualize').click();

for (let i = 0; i < 2; i++) {
  cy.get('button[title="zoom in"]').click();
}
cy.wait(2000);

for (let i = 0; i < 2; i++) {
  cy.get('button[title="zoom out"]').click();
}
cy.wait(2000);
for (let i = 0; i < 2; i++) {
  cy.get('button[title="fit view"]').click();
}
cy.wait(2000);


cy.get('button[title="toggle interactivity"]').click();
cy.wait(2000);
cy.get('button[title="toggle interactivity"]').click();

cy.wait(1000);
for (let i = 0; i < 2; i++) {
  cy.get('button[title="zoom out"]').click();
}
cy.wait(2000);
cy.get('button[title="Export diagram as PDF"]').click();
cy.wait(3000);
cy.screenshot('PDF downloaded succesfully');


cy.wait(2000);
cy.get('select[title="Lineage Steps (applies to both forward and backward)"]').select(Homepage.steps[0]);
cy.wait(2000);
//=======================================back button 
cy.get('button.flex.items-center.text-gray-600.hover\\:text-gray-800.hover\\:bg-gray-100.rounded-md.transition-colors').click();






});
}); 