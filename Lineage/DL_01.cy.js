import credentials from '../../fixtures/login.json';
import Homepage from '../../fixtures/Lineage/Homepage.json';

describe('Lineage Homepage1 selecting single Database,connection,schema,Type', () => {
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
Homepage.Database.forEach((value) => {
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
  Homepage.Connection.forEach((value) => {
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
 Homepage.schema.forEach((value) => {
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

Homepage.Type.forEach((value) => {
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
  });
});
