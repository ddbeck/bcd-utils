import assert from 'node:assert/strict';

import bcd from '@mdn/browser-compat-data' assert { type: 'json' };
import query from './query.js';
import {
  descendantKeys,
  isBrowser,
  isFeature,
  isMeta,
  joinPath,
} from './walkingUtils.js';

describe('joinPath()', function () {
  it('joins dotted paths to features', function () {
    assert.equal(joinPath('html', 'elements'), 'html.elements');
  });

  it('silently discards undefineds', function () {
    assert.equal(joinPath(undefined, undefined, undefined), '');
    assert.equal(joinPath(undefined, 'api'), 'api');
  });
});

describe('isBrowser()', function () {
  it('returns true for browser-like objects', function () {
    assert.ok(isBrowser(bcd.browsers.firefox));
  });

  it('returns false for feature-like objects', function () {
    assert.equal(isBrowser(query('html.elements.a')), false);
  });
});

describe('isFeature()', function () {
  it('returns false for browser-like objects', function () {
    assert.equal(isFeature(bcd.browsers.chrome), false);
  });

  it('returns true for feature-like objects', function () {
    assert.ok(isFeature(query('html.elements.a')));
  });
});

describe('isMeta()', function () {
  it('returns true for __meta objects', function () {
    assert.ok(isMeta(bcd.__meta));
  });

  it('returns false for browser-like objects', function () {
    assert.equal(isMeta(bcd.browsers.chrome), false);
  });

  it('returns false for feature-like objects', function () {
    assert.equal(isMeta(query('html.elements.a')), false);
  });
});

describe('descendantKeys()', function () {
  it('returns an empty array for __meta', function () {
    assert.equal(descendantKeys(bcd.__meta).length, 0);
  });

  it('returns an empty array for browser', function () {
    assert.equal(descendantKeys(bcd.browsers.chrome).length, 0);
  });

  it('returns descendant feature keys but not __compat', function () {
    const keys = descendantKeys(bcd.css.properties.display);
    assert.equal(keys.includes('__compat'), false);
    assert.ok(keys.length > 0);
    assert.ok(
      keys.every(key => typeof key === 'string' || key instanceof String),
    );
  });
});
