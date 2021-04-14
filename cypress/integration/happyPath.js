import { runTestsWithImageSnapshots } from '../support/plugin-snapshots';

describe('happy path', () => {
  runTestsWithImageSnapshots(() => {
    describe('blog', () => {
      beforeEach(() => {
        cy.visit('/');
      });

      it('visits blog', () => {
        cy.matchImageSnapshot({ name: 'blog' });

        cy.get('[data-testid="BlogSeriesLink"]').first().click();
        cy.get('[data-testid="BlogSeriesPageLink"]').first().click();
      });
    });

    describe('work', () => {
      beforeEach(() => {
        cy.visit('/work');
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
        cy.visit('/start');
      });

      it('visits start', () => {
        cy.matchImageSnapshot({ name: 'start' });
      });
    });
  });
});
