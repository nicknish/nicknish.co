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

// describe('Site traversal', () => {
//   let sitemap = [];

//   before(() => {
//     // this brings up the dev 404 page which sort of acts as the sitemap.xml.
//     // unfortunately /sitemap.xml doesn't exist in development
//     cy.visit('/sitemap.xml');

//     cy.get('ul > li').each(li => {
//       const path = li.text();
//       sitemap.push(path);
//     });
//   });

//   describe('fetched sitemap', () => {
//     Cypress._.range(0, 50).forEach(i => {
//       it(`visits page ${i}`, () => {
//         cy.visit(sitemap[i]);
//         // cy.wait(1000);
//         // cy.screenshot(`${sitemap[i]} - test`);
//       });
//     });
//   });
// });
