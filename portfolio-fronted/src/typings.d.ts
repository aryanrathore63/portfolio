/**
 * This file contains type declarations for the test environment.
 * It resolves TypeScript errors for:
 * - The 'require' function (used by Webpack's require.context)
 * - The 'zone.js/testing' module (used for Angular testing)
 */

// Declare the require function for Webpack's require.context
declare var require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    (id: string): any;
  };
};

// Declare the zone.js/testing module
declare module 'zone.js/testing';