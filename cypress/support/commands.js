// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-plugin-snapshots/commands';

// Taken from Autos
const matchImageSnapshot = (subject, options) => {
  const updateSnapshotsConfig = Cypress.env('cypress-plugin-snapshots')
    .updateSnapshots;

  if (updateSnapshotsConfig) {
    // @ts-ignore
    const testFile = Cypress.mocha.getRunner().suite.ctx.test.invocationDetails
      .relativeFile;
    const relativePath = `${testFile.substring(
      0,
      testFile.lastIndexOf('/')
    )}/__image_snapshots__/`;

    const fileName =
      options?.name ||
      // @ts-ignore
      `${Cypress.mocha.getRunner().suite.title}  ${
        // @ts-ignore
        Cypress.mocha.getRunner().suite.ctx.test.title
      }`;

    const relativePathFilename = `${relativePath}${fileName}`;

    cy.exec(`make cypress_clean_snapshot filename="${relativePathFilename}"`, {
      failOnNonZeroExit: false,
    });
  }
  return subject
    ? cy.wrap(subject).toMatchImageSnapshot(options)
    : cy.document().toMatchImageSnapshot(options);
};

Cypress.Commands.add(
  'matchImageSnapshot',
  { prevSubject: ['optional'] },
  matchImageSnapshot
);
