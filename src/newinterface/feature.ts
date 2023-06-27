import {
  Identifier,
  SupportStatement,
  BrowserName,
} from '@mdn/browser-compat-data';

import { Browser, Release } from './browser.js';
import query from '../query.js';

export function feature(id: string): Feature {
  return new Feature(id);
}

export class Feature {
  id: string; // dotted.path.to.feature
  data: Identifier; // underlying BCD object

  constructor(id: string) {
    this.id = id;
    this.data = query(id);
    if (!('__compat' in this.data)) {
      throw `${id} is not a valid feature`;
    }
  }

  // The simple case is to show a `Feature` a `Release` object and let it
  // respond with boolean-ish value.
  // supportedBy(release: Release): supported;
  // supportedBy(release: Release) {
  // TODO: is release in the range of statements represented by this.supportStatements(release.browser.id)?
  // const statements = this.supportStatements(release.browser.id);
  // TODO: find a "version_added statement"
  // }

  // But there's no reason we can't pass multiple releases in (and `&&` them
  // together, or near enough to it).
  // supportedBy(releases: Release[]): supported;
  // supportedBy(...releases: Release[]): supported;

  // But BCD is very nuanced, so we'll need to offer some options, particularly around partial implementations.
  // supportedBy(releases: Release[], options: supportedByOptions): supported;

  // Partials and notes will probably require some interrogation. Likewise, some
  // consumers might want a more complex resolution to the question of multiple
  // releases having potentially-conflicting supoprt values. For them, we offer
  // the details for every release as a Map.
  // supportDetailsFor(
  //   releases: Release[],
  //   options: supportedByOptions,
  // ): Map<Release, { supported: supported; notes: Note }>;

  // This is a little more speculative. Maybe you'd like to get notes for a
  // specific release?
  // notesFor(release: Release | Release[], options: supportedByOptions): Note[];

  supportStatements(
    browser: BrowserName | Browser | Release,
  ): SupportStatement[] {
    let browserKey;
    if (browser instanceof Browser) {
      browserKey = browser.id;
    } else if (browser instanceof Release) {
      browserKey = browser.browser.id;
    } else {
      browserKey = browser;
    }

    const support = this.data.__compat?.support[browserKey] ?? [];
    if (Array.isArray(support)) {
      return support;
    }
    return [support];
  }

  // Not in-scope for this proposal, but things to consider for the future:
  // Relative feature traversal
  // parent(): Feature | Namespace;
  // children(): (Feature | Namespace)[];
}
