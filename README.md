# postcss-error-to-vscode-diagnostic

[![NPM version](https://img.shields.io/npm/v/postcss-error-to-vscode-diagnostic.svg)](https://www.npmjs.com/package/postcss-error-to-vscode-diagnostic)
[![Build Status](https://travis-ci.org/shinnn/postcss-error-to-vscode-diagnostic.svg?branch=master)](https://travis-ci.org/shinnn/postcss-error-to-vscode-diagnostic)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/postcss-error-to-vscode-diagnostic.svg)](https://coveralls.io/github/shinnn/postcss-error-to-vscode-diagnostic?branch=master)

Convert a [`CssSyntaxError`](http://api.postcss.org/CssSyntaxError.html) of [PostCSS](http://postcss.org/) into a [diagnostic](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Diagnostic) of [Visual Studio Code](https://code.visualstudio.com/)

```javascript
const postcss = require('postcss');
const postcssErrorToVscodeDiagnostic = require('postcss-error-to-vscode-diagnostic');

const {error} = postcss().process(`
  div {
    color::red
  }
`);
/* CssSyntaxError {
  reason: 'Double colon',
  line: 3,
  column: 11,
  ...
} */

stylelintWarningToVscodeDiagnostic(error);
/* {
  message: 'Double colon (syntax error)',
  severity: 1,
  range: {
    start: {
      line: 2,
      column: 10
    },
    end: {
      line: 2,
      column: 10
    }
  }
} */
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install postcss-error-to-vscode-diagnostic
```

## API

```javascript
const postcssErrorToVscodeDiagnostic = require('postcss-error-to-vscode-diagnostic');
```

### postcssErrorToVscodeDiagnostic(*error* [, *additionalProperties*])

*error*: [`CssSyntaxError`](https://github.com/postcss/postcss/blob/ea3290a31d28dbc1502e1f03fddb1c927dcdbc35/lib/css-syntax-error.es6#L34)  
*additionalProperties*: `Object`  
Return: `Object` (VS Code [diagnostic](https://github.com/Microsoft/vscode-languageserver-node/blob/release/3.0.3/types/src/main.ts#L161-L192))

The returned diagnostic has [`message`](https://github.com/Microsoft/vscode-languageserver-node/blob/2f9d6055a77d8e9d31ecda03f8b1c54dd5ea0246/types/src/main.ts#L188-L191), [`range`](https://github.com/Microsoft/vscode-languageserver-node/blob/2f9d6055a77d8e9d31ecda03f8b1c54dd5ea0246/types/src/main.ts#L166-L169) and [`severity`](https://github.com/Microsoft/vscode-languageserver-node/blob/2f9d6055a77d8e9d31ecda03f8b1c54dd5ea0246/types/src/main.ts#L171-L175) by default.

All properties of the second argument will be [assigned](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to the return value. For example you can add a missing [`source`](https://github.com/Microsoft/vscode-languageserver-node/blob/2f9d6055a77d8e9d31ecda03f8b1c54dd5ea0246/types/src/main.ts#L182-L186) property as below:

```javascript
const error = postcss().process('foo');

postcssErrorToVscodeDiagnostic(error);
/* {
  message: 'Unknown word (syntax error)',
  severity: 1,
  range: { ... }
} */

postcssErrorToVscodeDiagnostic(error, {source: 'my-awesome-linter'});
/* {
  message: 'Unknown word (syntax error)',
  severity: 1,
  range: { ... },
  source: 'my-awesome-linter'
} */
```

## License

Copyright (c) 2017 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
