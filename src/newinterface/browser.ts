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
  _releases: Release[];

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

    this._releases = [];
    for (const version of Object.keys(this.data.releases)) {
      this._releases.push(new Release(this, version));
    }

    this._releases.sort((a, b) => {
      // TODO: Use regular valueOf comparison
      const padDotZero = (str: string): string =>
        str.includes('.') ? str : `${str}.0`;
      const toInt = (str: string): number => Number.parseInt(str, 10);
      const [aMajor, aMinor] = padDotZero(a.version).split('.').map(toInt);
      const [bMajor, bMinor] = padDotZero(b.version).split('.').map(toInt);

      if (aMajor - bMajor < 0) {
        return -1;
      }
      if (aMajor - bMajor > 0) {
        return 1;
      }
      return aMinor - bMinor;
    });
  }

  toArray(options?: { includePreReleases: boolean }): Release[] {
    const releases: Release[] = [];
    for (const rel of this._releases) {
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

  static isRelease(object: unknown): object is Release {
    if (object instanceof Release) {
      return true;
    }
    return false;
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
