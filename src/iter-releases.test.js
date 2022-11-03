const assert = require('assert').strict;

const iterReleases = require('./iter-releases');
const query = require('./query');

describe('iterReleases()', function () {
  it('returns array of friendlier release objects', function () {
    for (const obj of iterReleases(query('browsers.chrome').releases)) {
      assert.ok('version' in obj);
      assert.ok('release_date' in obj);
    }
  });

  it('returns array release objects in sorted order', function () {
    const expected = ['1', '1.5', '2', '3', '3.5', '3.6'];
    const actual = [...iterReleases(query('browsers.firefox').releases)]
      .slice(0, 6)
      .map(obj => obj.version);

    assert.deepStrictEqual(actual, expected);
  });
});
