describe('happy path', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('blog', () => {
    it('visits blog', () => {
      cy.matchImageSnapshot({ name: 'blog' });

      cy.get('[data-testid="BlogSeriesLink"]').first().click();
      cy.get('[data-testid="BlogSeriesPageLink"]').first().click();
    });
  });

  describe('work', () => {
    beforeEach(() => {
      cy.get('[data-testid="NavLink--/work"]').first().click();
    });

    it('visits work', () => {
      cy.matchImageSnapshot({ name: 'work' });

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

  describe('start', () => {
    beforeEach(() => {
      cy.get('[data-testid="NavLink--/start"]').first().click();
    });

    it('visits start', () => {
      cy.matchImageSnapshot({ name: 'start' });
    });
  });
});
