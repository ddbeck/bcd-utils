// Walk over every feature, print its identifier, and its description (if it has one)

import { walk } from '..';

function log(path, compat) {
  if ('description' in compat) {
    console.log(`${path} (${compat.description})`);
  } else {
    console.log(`${path}`);
  }
}

for (const { path, compat } of walk('javascript')) {
  if (compat.status.deprecated === true) {
    log(path, compat);
  }
}
