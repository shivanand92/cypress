/// <reference types="cypress" />

describe('Data-Quality Data page => Cleaning', () => {
  let credentials;

  before(() => {
    cy.fixture('userCredentials').then((data) => {
      credentials = data;
      
    });
  });

  it('Logs into Tantor portal and creates multiple groups', function () {
    Cypress.on('uncaught:exception', () => false);

    // Step 1: Login
    cy.visit(credentials.url, { failOnStatusCode: false });

    cy.get('#username', { timeout: 10000 }).should('be.visible').type(credentials.username);
    cy.get('#password').should('be.visible').type(credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Step 2: Navigate to Group Management Page
    cy.get('a[href="/dashboard"]').click();
    cy.contains('Data Governance', { timeout: 10000 }).should('be.visible').click();
    cy.wait(2000);


    // Step 1: Click menu buttons (2nd and 3rd)
    cy.get('button.p-1.hover\\:bg-gray-200.rounded-full.transition-transform.duration-300').eq(1).click();
    cy.wait(1000);
    cy.get('button.p-1.hover\\:bg-gray-200.rounded-full.transition-transform.duration-300').eq(2).click();
    cy.wait(1000);

    // Step 2: Click link to Rules page
    cy.get('a[href="/datagovernance/data-assurance/data"]').click();
    cy.get('div.ace_content').click();
cy.wait(1000);
    //cy.get('div.ace_content').click().type('SELECT * FROM Dataquality1.public.testing', { delay: 0 });

    cy.get('textarea.ace_text-input')
  .click({ force: true }) // ensures focus
  .type('SELECT * FROM Dataquality1.public.duplicate1', { force: true, delay: 0 });

cy.wait(1000);
  cy.contains('button', 'Run').click({ force: true });


 // cy.contains('button', 'Run').click();

cy.wait(1000);
cy.get('button.text-gray-500.p-1.hover\\:bg-gray-50.rounded').eq(0).click();
cy.wait(1000);
 cy.contains('button', 'Next').click({ force: true });
 cy.wait(4000);

 cy.contains('button', 'Next').click({ force: true });
  cy.wait(4000);
   cy.contains('button', 'Next').click({ force: true });
cy.wait(1000);
//================================Drop Outliers================================================
   cy.get('input[type="checkbox"]').eq(1).click({ force: true });
cy.wait(1000);
cy.get('button[type="submit"]').click({ force: true });
//cy.screenshot('Data Cleaned successfully');
//cy.wait(1000);
cy.contains('button', 'Display').click({ force: true });
cy.screenshot('Cleaned data succesfully');
cy.contains('button', 'Close').click({ force: true });
cy.wait(1000);
cy.contains('button', 'Clear').click({ force: true });
cy.wait(1000);

//=========================================Handle Missing values========================================================
cy.get('input[type="checkbox"]').eq(2).click({ force: true });
cy.wait(1000);
// Select the dropdown option with visible text "Mean"
cy.get('select[name="missing_values_strategy"]').select('Mean');
cy.wait(1000);

cy.get('button[type="submit"]').click({ force: true });
//cy.screenshot('Data Cleaned successfully');
//cy.wait(1000);
cy.contains('button', 'Display').click({ force: true });
cy.screenshot('Cleaned data succesfully');
cy.contains('button', 'Close').click({ force: true });
cy.wait(1000);
cy.contains('button', 'Clear').click({ force: true });
cy.wait(1000);

//======================================Handle missing catagorical
cy.get('input[type="checkbox"]').eq(3).click({ force: true });
cy.wait(1000);
// Select the dropdown option with visible text "Mean"
//cy.get('select[name="missing_values_strategy"]').select('Mode');
cy.wait(1000);

cy.get('button[type="submit"]').click({ force: true });
//cy.screenshot('Data Cleaned successfully');
//cy.wait(1000);
cy.contains('button', 'Display').click({ force: true });
cy.screenshot('Cleaned data succesfully');
cy.contains('button', 'Close').click({ force: true });
cy.wait(1000);
cy.contains('button', 'Clear').click({ force: true });
cy.wait(1000);
//====================================================change datatypes====================
cy.get('input[type="checkbox"]').eq(4).click({ force: true });
cy.wait(1000);
// Select the dropdown option with visible text "Mean"
cy.get('select[name="datatype_conversion_column"]').select('ID');
cy.wait(1000);

cy.get('select[name="datatype_conversion_type"]').select('Boolean');
cy.wait(1000);


cy.get('button[type="submit"]').click({ force: true });
//cy.screenshot('Data Cleaned successfully');
//cy.wait(1000);
cy.contains('button', 'Display').click({ force: true });
cy.screenshot('Cleaned data succesfully');
cy.contains('button', 'Close').click({ force: true });
cy.wait(1000);
cy.contains('button', 'Clear').click({ force: true });
cy.wait(1000);

//===============================================Removed correlated 

 cy.get('input[type="checkbox"]').eq(7).click({ force: true });
cy.wait(1000);
cy.get('button[type="submit"]').click({ force: true });
//cy.screenshot('Data Cleaned successfully');
//cy.wait(1000);
cy.contains('button', 'Display').click({ force: true });
cy.screenshot('Cleaned data succesfully');
cy.contains('button', 'Close').click({ force: true });
cy.wait(1000);
cy.contains('button', 'Clear').click({ force: true });
cy.wait(1000);
//=====================================================
cy.get('input[type="checkbox"]').eq(9).click({ force: true });
cy.wait(1000);
cy.get('select[name="bin_column_name"]').select('ID');
cy.wait(1000);
// Type "1-3" into the input field
cy.get('input[name="bin_values"]').type('1,3');
cy.wait(1000);
cy.get('button[type="submit"]').click({ force: true });
//cy.screenshot('Data Cleaned successfully');
//cy.wait(1000);
cy.contains('button', 'Display').click({ force: true });
cy.screenshot('Cleaned data succesfully');
cy.contains('button', 'Close').click({ force: true });
cy.wait(1000);
cy.contains('button', 'Clear').click({ force: true });
cy.wait(1000);
});
});
