import { SimpleSupportStatement, VersionValue } from '@mdn/browser-compat-data';
import { Browser, Release } from './browser.js';

export function statement(
  data: SimpleSupportStatement,
): SupportStatement | RealSupportStatement {
  try {
    return new RealSupportStatement(data);
  } catch (err) {
    // console.log(err);
    // console.log(data);
    if (err instanceof NonRealValueError) {
      return new SupportStatement(data);
    }
    throw err;
  }
}

export class SupportStatement implements SimpleSupportStatement {
  data: SimpleSupportStatement;

  constructor(data: SimpleSupportStatement) {
    this.data = data;
  }

  get version_added(): VersionValue {
    return this.data.version_added;
  }

  get version_removed(): VersionValue {
    return this.data.version_removed ?? false;
  }
}

type NonRealValue = null | true;

export class NonRealValueError extends Error {
  constructor(key: string, value: NonRealValue) {
    super();
    this.message = `${value} is not a real value`;
  }
}

export function isNonRealValue(value: unknown): value is NonRealValue {
  return value === true || value === null;
}

export class RealSupportStatement extends SupportStatement {
  constructor(data: SimpleSupportStatement) {
    super(data);
    if (isNonRealValue(this.data.version_added)) {
      throw new NonRealValueError('version_added', this.data.version_added);
    }
    if (isNonRealValue(this.data.version_removed)) {
      throw new NonRealValueError('version_removed', this.data.version_removed);
    }
  }

  get version_added(): string | false {
    return super.version_added as string | false;
  }

  get version_removed(): string | false {
    return (super.version_removed as string) ?? false;
  }

  includes(release: Release) {
    if (this.version_added === false) {
      return false;
    }
    return this.toReleases(release.browser).includes(release);
  }

  // TODO: figure out a way to annotate support statements with browser information on construction
  toReleases(browser: Browser): Release[] {
    console.log(`toReleases: called for ${JSON.stringify(this.data)}`);
    if (this.version_added === false) {
      // console.log(`toReleases: version added is false, no releases`);
      return [];
    }

    const startRelease = browser.releaseFromVersion(
      this.version_added,
    ) as Release;
    // console.log(`toReleases: startRelease is ${startRelease}`);
    const endRelease: Release =
      this.version_removed === false
        ? browser.releaseAt(-1)
        : browser.releaseFromVersion(this.version_removed);
    // console.log(`toReleases: endRelease is ${endRelease}`);

    const result = [];
    for (const r of browser.toArray({ includePreReleases: true })) {
      console.log(
        `comparing ${r.toString()} to ${startRelease.toString()} (${r.compare(
          startRelease,
        )}) and ${endRelease.toString()} (${r.compare(endRelease)})`,
      );
      if (0 <= r.compare(startRelease) && r.compare(endRelease) >= 0) {
        console.log(`accepted ${r.toString()}`);
        result.push(r);
      }
    }
    return result;
  }
}
