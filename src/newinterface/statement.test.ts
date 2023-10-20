import assert from 'assert/strict';

import {
  statement,
  RealSupportStatement,
  isNonRealValue,
} from './statement.js';

describe('isNonRealValue', function () {
  it('returns false for strings and false', function () {
    assert(isNonRealValue(false) === false);
    assert(isNonRealValue('1') === false);
  });

  it('returns false for true and null', function () {
    assert(isNonRealValue(true));
    assert(isNonRealValue(null));
  });
});

describe('statement', function () {
  it('exposes basic attributes of a support statement', function () {
    const exampleSimpleSupportStatement = { version_added: '1' };
    const s = statement(exampleSimpleSupportStatement);

    assert(s.data === exampleSimpleSupportStatement);
    assert(s instanceof RealSupportStatement);

    assert(s.version_added === '1');
    assert(s.version_removed === false);
  });
});
