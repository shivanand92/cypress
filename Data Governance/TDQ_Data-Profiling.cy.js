/// <reference types="cypress" />

describe('Data-Quality Data page => Profiling', () => {
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
  .type('SELECT * FROM Dataquality1.public.testing', { force: true, delay: 0 });

cy.wait(1000);
  cy.contains('button', 'Run').click({ force: true });


 // cy.contains('button', 'Run').click();

cy.wait(1000);
cy.get('button.text-gray-500.p-1.hover\\:bg-gray-50.rounded').eq(0).click();
cy.wait(1000);
 cy.contains('button', 'Next').click({ force: true });
 cy.wait(4000);

 cy.contains('button', 'Next').click({ force: true });
 cy.wait(3000);
cy.screenshot('Dataset statistics');
cy.wait(1000);

//=============================================First one==================================
//cy.scrollTo(0, 400);
// Toggle and navigate inside the iframe
cy.get('iframe[title="HTML Content"]')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .as('iframeBody');

cy.get('@iframeBody').find('a.navbar-toggler').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').contains('a', 'Variables').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').find('a.btn-close').click({ force: true });
//==========================================Variable started=======================
cy.wait(500);
cy.get('@iframeBody').find('select.form-select').select('status');

cy.wait(500);


// Toggle and navigate inside the iframe
cy.get('iframe[title="HTML Content"]')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .as('iframeBody');
//================================================Correlations=============================
cy.get('@iframeBody').find('a.navbar-toggler').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').contains('a', 'Correlations').click({ force: true });
cy.wait(500);


cy.wait(500);
// Click on Table tab in Correlations section
cy.get('@iframeBody').find('button#tab-auto_diagram_table-auto_table').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').find('a.btn-close').click({ force: true });
//=========================================MIssing value=============================================

// Toggle and navigate inside the iframe
cy.get('iframe[title="HTML Content"]')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .as('iframeBody');

cy.get('@iframeBody').find('a.navbar-toggler').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').contains('a', 'Missing values').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').find('a.btn-close').click({ force: true });

cy.wait(500);
// Click on Matrix tab inside the iframe
cy.get('@iframeBody').find('button#tab-missing-matrix').click({ force: true });
cy.wait(500);
//===========================================================================================
//=======================================Sample========================================
// Toggle and navigate inside the iframe
cy.get('iframe[title="HTML Content"]')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .as('iframeBody');

cy.get('@iframeBody').find('a.navbar-toggler').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').contains('a', 'Sample').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').find('a.btn-close').click({ force: true });

cy.wait(500);
// Click on Matrix tab inside the iframe
cy.get('@iframeBody').find('button#tab-missing-matrix').click({ force: true });
cy.wait(500);
cy.wait(1000);

//=======================================Alerts========================================
// Navigate back to Overview section first, then click Alerts tab
cy.get('@iframeBody').find('a.navbar-toggler').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').contains('a', 'Overview').click({ force: true });
cy.wait(500);
cy.get('@iframeBody').find('a.btn-close').click({ force: true });

cy.wait(500);
// Now click on Alerts tab in Overview section
cy.get('@iframeBody').find('button#tab-overview-alerts').click({ force: true });
cy.wait(500);
cy.screenshot('Alerts');
// Click on Reproduction tab in Overview section
cy.get('@iframeBody').find('button#tab-overview-reproduction').click({ force: true });
cy.wait(500);
cy.screenshot('Reproduction');
});
});
