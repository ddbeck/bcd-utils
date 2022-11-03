const { compareVersions } = require('compare-versions');

function* iterReleases(data) {
  const arr = [];

  for (const [key, value] of Object.entries(data)) {
    arr.push({
      ...value,
      version: key,
    });
  }

  arr.sort((a, b) => compareVersions(a.version, b.version));

  yield* arr;
}

module.exports = iterReleases;
