/**
 * Based on
 * @see https://stackoverflow.com/a/61499577
 */

/**
 * This whole thing stinks. Please refactor. Issues:
 *
 * 1. `cy.screenshot` is prone to error with `Error: Could not find MIME for Buffer <null>`
 *    This only gets worse when setting the viewport in `cypress.json`
 * 2. Dynamically create a single individual test per sitemap path. Right now we
 *    just throw out a generic number `50` so it runs on every path.
 * 3. Use the sitemap path to generate the test assertion and the screenshot
 *    name correctly.
 */

describe('Site traversal', () => {
  let sitemap = [];

  before(async () => {
    // this brings up the dev 404 page which sort of acts as the sitemap.xml.
    // unfortunately /sitemap.xml doesn't exist in development
    const response = await cy.request('/sitemap.xml');

    sitemap = Cypress.$(response.body)
      // according to the sitemap.xml spec,
      // the url value should reside in a <loc /> node
      // https://www.google.com/sitemaps/protocol.html
      .find('loc')
      // map to a js array
      .toArray()
      // get the text of the <loc /> node
      .map((el) => el.innerText);
  });

  describe('fetched sitemap', () => {
    it('should successfully load each url in the sitemap', () => {
      sitemap.forEach((location, idx) => {
        cy.visit(location);
        cy.matchImageSnapshot(location);
      });
    });
  });
});
