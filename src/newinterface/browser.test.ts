import assert from 'node:assert/strict';

import { Release, browser } from './browser.js';

describe('browser()', function () {
  it('exposes basic attributes of a browser', function () {
    const b = browser('chrome');
    assert.ok(b.name === 'Chrome');
    assert.ok(b.preview_name === 'Canary');

    b.releaseAt(0); // current release
    b.releaseAt(-2); // two releases ago
    b.releaseAt(1); // future release
    // b.releasesSince('2022-01-01'); // array of releases on or after the date
  });

  it('#toArray()', function () {
    const b = browser('chrome');
    const releases = b.toArray();
    for (const release of releases) {
      assert.ok(!release.isPrerelease());
    }
  });

  it('#isRelease() (static method)', function () {
    const b = browser('chrome');
    const rel0 = b.releaseAt(0);
    assert.ok(Release.isRelease(rel0));

    assert.ok(!Release.isRelease(undefined));
    assert.ok(!Release.isRelease(null));
    assert.ok(!Release.isRelease(0));
    assert.ok(!Release.isRelease({ random: 'object' }));
  });

  it('#releaseAt()', function () {
    const b = browser('chrome');
    const r0 = b.releaseAt(0) as Release;
    assert.equal(r0.version, '1');

    const rNeg1 = b.releaseAt(-1);
    const rNeg2 = b.releaseAt(-2);

    if (!Release.isRelease(rNeg1) || !Release.isRelease(rNeg2)) {
      throw new Error('Bad examples! Did something change in BCD?');
    }

    assert.ok(Number.parseInt(rNeg1.version) > 110);
    assert.equal(
      Number.parseInt(rNeg1.version) - Number.parseInt(rNeg2.version),
      1,
      `${rNeg1.version}, ${rNeg2.version}`,
    );
  });
});
