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
    cy.scrollTo('bottom');
    cy.wait(1000);
    // Click the first "Open actions menu" button
cy.get('button[aria-label="Open actions menu"]').eq(0).click();
cy.wait(1000);

// Click the "Edit" button
//cy.get('button[aria-label="Edit"]').click();
//cy.wait(1000);

// Click the "Delete" button
cy.get('button[aria-label="Delete"]').click();
cy.wait(1000);
cy.contains('button', 'Delete').click();
cy.screenshot('Deleted Successfully');

// Click the "Run" button
/*cy.get('button[aria-label="Run"]').click();
cy.wait(2000);
cy.reload();
cy.wait(2000);
cy.reload();
cy.wait(2000);
cy.reload();
cy.screenshot('Completed');*/
cy.get('a[href="/report"]').click();
cy.wait(1000);

// Click on first "See details"
cy.contains('button', 'See details').first().click();
cy.wait(1000);

// Click "Generate Report"
cy.contains('button', 'Generate Report').click();

// Select "Migration" from dropdown
cy.get('select.w-full.p-2\\.5.border.border-gray-400.rounded-lg.focus\\:outline-none.focus\\:border-\\[\\#8e78b7\\].focus\\:ring-1.focus\\:ring-\\[\\#8e78b7\\].appearance-none.bg-white')
  .select('Purge');
cy.wait(1000);

// Get today's date in MM/DD/YYYY format (07/22/2025 style)
const today = new Date();
const formattedDate = today.toISOString().split('T')[0]; // returns '2025-07-22'

// Fill Start Date
cy.get('input[type="date"]').eq(0).clear().type(formattedDate);

// Fill End Date
cy.get('input[type="date"]').eq(1).clear().type(formattedDate);
cy.wait(1000);

// Click "Create"
cy.contains('button', 'Create').click();
cy.wait(2000);

// Click export dropdown
cy.get('button.flex.items-center.px-4.py-2.border.border-gray-400.rounded-lg.hover\\:bg-\\[\\#8e78b7\\].hover\\:text-white.transition-colors').click();
cy.wait(1000);

// Select first dropdown item
cy.get('div.block.cursor-pointer.w-full.text-left.px-4.py-2.text-sm.text-gray-700.hover\\:bg-gray-100.hover\\:text-gray-900').first().click();
cy.wait(4000);

// Click "Cancel"
cy.contains('div', 'Cancel').click();
cy.wait(5000);

});
});