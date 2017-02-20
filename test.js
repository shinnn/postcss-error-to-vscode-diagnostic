'use strict';

const fn = require('.');
const postcss = require('postcss');
const test = require('tape');

test('postcssErrorToVscodeDiagnostic()', t => {
  t.deepEqual(
    fn(postcss().process('a').error),
    {
      message: 'Unknown word (syntax error)',
      range: {
        end: {
          column: 0,
          line: 0
        },
        start: {
          column: 0,
          line: 0
        }
      },
      severity: 1
    },
    'should convert a CssSyntaxError into a VS Code diagnostic.'
  );

  t.deepEqual(
    fn(postcss().process('\n  }').error, {source: 'awesome-css-processor'}),
    {
      message: 'Unexpected } (syntax error)',
      range: {
        end: {
          line: 1,
          column: 2
        },
        start: {
          line: 1,
          column: 2
        }
      },
      severity: 1,
      source: 'awesome-css-processor'
    },
    'should override values with the second argument.'
  );

  t.throws(
    () => fn(),
    /^TypeError.*Expected 1 or 2 arguments \(object\[, object]\), but got no arguments instead\./,
    'should throw an error when it takes no arguments.'
  );

  t.throws(
    () => fn({}, {}, {}),
    /^TypeError.*Expected 1 or 2 arguments \(object\[, object]\), but got 3 arguments instead\./,
    'should throw an error when it takes too many arguments.'
  );

  t.throws(
    () => fn(null),
    /^TypeError.*Expected an instance of postcss's CssSyntaxError, but got null instead\. /,
    'should throw an error when it takes null.'
  );

  t.throws(
    () => fn(Symbol('Hi')),
    /^TypeError.*Expected an instance of postcss's CssSyntaxError, but got Symbol\(Hi\) instead\. /,
    'should throw an error when it takes a non-object value.'
  );

  t.throws(
    () => fn({foo: 'bar'}),
    /^TypeError.*Expected an instance of postcss's CssSyntaxError, but got { foo: 'bar' } instead\. /,
    'should throw an error when the frist argument is not a CssSyntaxError.'
  );

  t.end();
});
