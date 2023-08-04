// Walk over every feature, print its identifier, and its description (if it has one)

import { walk, iterSupport } from '../src/index.js';
import TSV from 'tsv';

const lines = [];

for (const { path, compat } of walk()) {
  const line = {
    path: path,
    deprecated: compat.status?.deprecated,
    experimental: compat.status?.experimental,
    chrome: getVersionAdded(compat, 'chrome'),
    chrome_android: getVersionAdded(compat, 'chrome_android'),
  };

  lines.push(line);
}

console.log(TSV.stringify(lines));

function getVersionAdded(compat, browserKey) {
  for (const statement of iterSupport(compat, browserKey)) {
    if (
      statement.version_removed === true ||
      typeof statement.version_removed === 'string'
    ) {
      return 'removed';
    }
    return statement.version_added;
  }
}
