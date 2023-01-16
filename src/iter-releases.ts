import { compareVersions } from 'compare-versions';

interface Browser {
  name: String;
  type: String;
  releases: { [key: string]: Release };
}

interface Release {
  release_date: String;
  release_notes: String;
  status: String;
  engine: String;
  engine_version: String;
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
