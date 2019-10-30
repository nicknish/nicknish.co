describe('happy path', function() {
  beforeEach(() => {
    cy.visit('/');
  });

  it('visits blog', function() {
    cy.get('[data-testid="NavLink--/"]')
      .first()
      .click();

    cy.get('[data-testid="BlogHeader"]').within(() => {
      cy.contains('Welcome to my blog');
      cy.get('[data-testid="NewsletterSignupForm"]').should('exist');
    });

    cy.get('[data-testid="BlogIndexPost"]')
      .first()
      .click();

    cy.visit('/');

    cy.get('[data-testid="BlogSeriesLink"]')
      .first()
      .click();

    cy.get('[data-testid="BlogSeriesPageLink"]')
      .first()
      .click();
  });

  it('visits work', () => {
    cy.get('[data-testid="NavLink--/work"]')
      .first()
      .click();

    cy.get('[data-testid="WorkSection--about"]').contains('About Me');

    cy.get('[data-testid="WorkSection--career"]').contains('Career');
    cy.get('[data-testid="WorkItem--/work/credit-karma"]').click();
    cy.get('[data-testid="ShowHeader"]').contains('Credit Karma');
    cy.get('[data-testid="ShowBackLink"]').click();

    cy.get('[data-testid="WorkSection--projects"]').contains('Projects');
    cy.get('[data-testid="WorkItem--/projects/portfolio"]').click();
    cy.get('[data-testid="ShowBackLink"]').click();
  });
});
