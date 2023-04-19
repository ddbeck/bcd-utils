import bcd from '@mdn/browser-compat-data' assert { type: 'json' };
import type {
  BrowserName,
  BrowserStatement,
  CompatData,
  ReleaseStatement,
} from '@mdn/browser-compat-data/types.js';

export function browser(key: BrowserName): Browser {
  return new Browser(key, bcd);
}

export class Browser {
  id: BrowserName;
  data: BrowserStatement; // Underlying BCD browser object

  // Pass through BCD values where convenient
  name: string;
  type: string;
  preview_name?: string;
  // etc.

  constructor(id: BrowserName, data: CompatData) {
    this.id = id;
    this.data = data.browsers[id];
    const { name, type, preview_name } = data.browsers[id];
    this.name = name;
    this.type = type;
    this.preview_name = preview_name;
  }

  toArray(options?: { includePreReleases: boolean }): Release[] {
    const releases: Release[] = [];
    for (const version of Object.keys(this.data.releases)) {
      const rel = new Release(this, version);
      if (rel.isPrerelease() && !options?.includePreReleases) {
        continue;
      }
      releases.push(rel);
    }
    return releases;
  }

  toString() {
    return `[Browser: ${this.name}]`;
  }

  releaseAt(index: number): Release | undefined {
    return this.toArray().at(index);
  }

  // releaseOn(date: string): Release | undefined {
  //   throw Error('Not implemented');
  // }
  // releasesFrom(index: number): Release[] | undefined {
  //   throw Error('Not implemented');
  // }
  // releasesSince(date: string): Release[] | undefined {
  //   throw Error('Not implemented');
  // }

  // The last method here is mostly for convenience on the common case of "does
  // this release support a given feature?". It's sugar for
  // `browser(browserKey).releaseAt(-1).supports(feature)`.
  // supports(feature: Feature): boolean | undefined {
  //   throw Error('Not implemented');
  // }
}

export class Release {
  browser: Browser;
  data: ReleaseStatement; // Underlying BCD release object

  // pass through BCD
  version: string;
  release_date: Date | typeof Infinity;
  status: string;
  name: string; // We could even pass through the underlying browser data
  // etc.

  constructor(browser: Browser, version: string) {
    this.browser = browser;
    this.version = version;
    this.data = browser.data.releases[version];

    this.release_date = this.data.release_date
      ? new Date(this.data.release_date)
      : Infinity;
    this.status = this.data.status;
    this.name = browser.name;
  }

  isPrerelease(): boolean {
    return ['beta', 'nightly', 'planned'].includes(this.status);
  }

  toString() {
    return `[${this.name} ${this.version}]`;
  }

  valueOf() {
    return this.release_date;
  }

  // Mostly for symmetry with `Browser` and `Feature`. It's sugar for
  // `feature.supportedBy(this)`;
  // supports(feature: Feature): boolean {
  //   throw Error('Not implemented');
  // }
}
