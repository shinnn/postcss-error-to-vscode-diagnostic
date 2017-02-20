/*!
 * postcss-error-to-vscode-diagnostic | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/postcss-error-to-vscode-diagnostic
*/
'use strict';

const {inspect} = require('util');

module.exports = function postcssErrorToVscodeDiagnostic(...args) {
  const argLen = args.length;

  if (argLen !== 1 && argLen !== 2) {
    throw new TypeError(`Expected 1 or 2 arguments (object[, object]), but got ${
      argLen === 0 ? 'no' : argLen
    } arguments instead.`);
  }

  const error = args[0];

  if (error === null || typeof error !== 'object' || error.name !== 'CssSyntaxError') {
    throw new TypeError(`Expected an instance of postcss's CssSyntaxError, but got ${
      inspect(error)
    } instead. http://api.postcss.org/CssSyntaxError.html`);
  }

  const position = {
    line: error.line - 1,
    column: error.column - 1
  };

  const diagnostic = {
    message: `${error.reason} (syntax error)`,
    // https://github.com/Microsoft/vscode-languageserver-node/blob/release/3.0.3/types/src/main.ts#L144
    severity: 1,
    range: {
      start: position,
      end: position
    }
  };

  if (argLen === 1) {
    return diagnostic;
  }

  return Object.assign(diagnostic, args[1]);
};
