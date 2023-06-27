import { BrowserStatement } from '@mdn/browser-compat-data';
import { compareVersions } from 'compare-versions';

function* iterReleases(data: BrowserStatement) {
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

export default iterReleases;
