import { visit } from '..';

function hasMdnUrl(compat) {
  return compat.mdn_url !== undefined;
}

function isStandardTrack(path, compat) {
  return compat.status !== undefined && compat.status.standard_track === true;
}

function missingSpecUrl(compat) {
  return compat.spec_url === undefined;
}

const standardTrack = new Set();
const missingSpec = new Set();

const milestone1 = new Set();
const milestone2 = new Set();

visit(
  (path, compat) => {
    standardTrack.add(path);
    if (hasMdnUrl(compat)) {
      milestone1.add(path);
    } else {
      milestone2.add(path);
    }

    if (missingSpecUrl(compat)) {
      missingSpec.add(path);
    }
  },
  { test: isStandardTrack },
);

console.log('## Milestone 1');
for (const path of standardTrack) {
  if (missingSpec.has(path) && milestone1.has(path)) {
    console.log(`1. \`${path}\``);
  }
}
console.log();

console.log('## Milestone 2');
for (const path of standardTrack) {
  if (missingSpec.has(path) && milestone2.has(path)) {
    console.log(`1. \`${path}\``);
  }
}
