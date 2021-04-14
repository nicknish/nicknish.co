/*
 * This wrapper is required to fix a Cypress issue where it does not populate
 * `Cypress.spec` properly when choosing to "Run all tests"
 *
 * @see https://github.com/cypress-io/cypress/issues/3090
 *
 * Pulled from Autos
 */
export const runTestsWithImageSnapshots = testsToRun => {
  before(() => {
    /* 
          Fixes a bug where when using zsh, the first command fails. 
          https://github.com/cypress-io/cypress/issues/6081
          Running a random command to ensure subsequent commands don't fail.
        */
    cy.exec(`node -v`, { failOnNonZeroExit: false });
  });

  beforeEach(() => {
    // @ts-ignore
    const filename = Cypress.mocha.getRunner().suite.ctx.currentTest
      .invocationDetails.relativeFile;

    const path = require('path');
    const projectRoot = Cypress.config('fileServerFolder');
    const absolute = path.join(projectRoot, filename);

    Cypress.spec = {
      absolute,
      name: path.basename(filename),
      relative: filename,
    };
  });

  testsToRun();
};

export const matchImageSnapshot = (subject, options) => {
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
