// Walk over every feature, print its identifier, and its description (if it has one)

import { query, walk } from '../build/index.js';

const lookups = process.argv.slice(2).flatMap(arg => arg.split(' '));

function log(path, compat) {
  logName(path, compat);
  console.log(compat.support.safari);
}

function logName(path, compat) {
  if ('description' in compat) {
    console.log(`${path} (${compat.description})`);
  } else {
    console.log(`${path}`);
  }
}

for (const lookup of lookups) {
  query(lookup);
}

for (const lookup of lookups) {
  for (const { path, compat } of walk()) {
    if (path === lookup) {
      log(path, compat);
    }
  }
}

// function children(p) {
//   for (const { path, compat } of walk(p)) {
//     logName(path, compat);
//   }
// }
