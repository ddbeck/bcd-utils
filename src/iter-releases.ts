import { compareVersions } from 'compare-versions';

interface Browser {
  name: string;
  type: string;
  releases: { [key: string]: Release };
}

interface Release {
  release_date: string;
  release_notes: string;
  status: string;
  engine: string;
  engine_version: string;
}

function* iterReleases(data: Browser) {
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
