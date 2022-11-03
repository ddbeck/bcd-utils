const { query, iterReleases } = require('../src');

const { argv } = require('process');

const [browser, version] = argv.slice(2);

const { releases } = query(`browsers.${browser}`);

for (const release of iterReleases(releases)) {
  if (release.version == version) {
    console.log(release);
  }
}
