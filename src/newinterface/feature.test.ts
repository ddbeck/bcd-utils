import assert from 'node:assert/strict';

import { feature } from './feature.js';
import { Release, browser } from './browser.js';

describe('feature()', function () {
  const f = feature('css.properties.border-color');

  it('exposes basic attributes of a feature', function () {
    assert.equal(f.id, 'css.properties.border-color');
  });

  it('#supportStatements()', function () {
    assert(Array.isArray(f.supportStatements('chrome')));

    const chrome = browser('chrome');
    assert(Array.isArray(f.supportStatements(chrome)));

    assert(Array.isArray(f.supportStatements(chrome.releaseAt(0) as Release)));
  });
});
