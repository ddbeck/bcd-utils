import { query, walk } from '../src/index.js';

const browser = process.argv[2];
const lookups = process.argv.slice(3).flatMap(arg => arg.split(' '));
const bcdKeys: string[] = [];
const candidateKeys: string[] = [];

for (const lookup of lookups) {
  try {
    query(lookup);
    bcdKeys.push(lookup);
    for (const { path } of walk(lookup)) {
      candidateKeys.push(path);
    }
  } catch (err) {
    if (err instanceof ReferenceError) {
      console.error(`${lookup} is not a valid BCD key`);
      process.exit(1);
    }
  }
}

function difference(setA: Set<string>, setB: Set<string>): Set<string> {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function log(path, compat) {
  logName(path, compat);
  console.log(compat.support[browser]);
}

function logName(path, compat) {
  if ('description' in compat) {
    console.log(`${path} (${compat.description})`);
  } else {
    console.log(`${path}`);
  }
}

const keys = new Set(bcdKeys);
const candidates = new Set(candidateKeys);
const diff = difference(candidates, keys);

if ([...diff].length > 0) {
  console.log('Possible children');
  for (const key of diff) {
    console.log(key);
  }
  // process.exit(1);
}

for (const lookup of bcdKeys) {
  for (const { path, compat } of walk()) {
    if (path === lookup) {
      log(path, compat);
    }
  }
}
