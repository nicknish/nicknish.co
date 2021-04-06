const SUCCESS_RESPONSE = {
  status: 200,
};

describe('Newsletter Signup', () => {
  beforeEach(() => {
    cy.intercept('/.netlify/functions/newsletterSignup', SUCCESS_RESPONSE);
  });

  it('signs up for newsletter', () => {
    cy.visit('/start');

    cy.get('[data-testid="NewsletterSignupForm"]').within(() => {
      cy.get('input').first().type('nicknish@');
      cy.get('button').first().click();
      cy.get('input').clear();
    });

    cy.get('[data-testid="NewsletterSignupForm--error"]').contains('Oops');

    cy.get('[data-testid="NewsletterSignupForm"]').within(() => {
      cy.get('input').first().type('nicknish@example.com');
      cy.get('button').first().click();
    });

    cy.get('[data-testid="NewsletterSignupForm--success"]').contains(
      'Thanks for signing up'
    );
  });
});
