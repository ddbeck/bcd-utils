const bcd = require("./bcd");
const query = require("./query");

const topLevelBcdKeys = Object.keys(bcd);
const topLevelBcdKeysWalkable = [
  ...Object.keys(bcd).filter((k) => k !== "browsers"),
];

function isTopLevelBcd(obj) {
  return topLevelBcdKeys.every((key) => key in obj);
}

function joinPath() {
  return Array.from(arguments).filter(Boolean).join(".");
}

function* descendantKeys(data) {
  for (const key of Object.keys(data)) {
    if (key !== "__compat") {
      yield key;
    }
  }
}

function isFeature(obj) {
  return "__compat" in obj;
}

function* lowLevelWalk(data = bcd, path, depth = Infinity) {
  if (isFeature(data)) {
    yield {
      path: path,
      compat: data.__compat,
    };
  }

  let childKeys = descendantKeys(data);
  if (path === undefined && isTopLevelBcd(data)) {
    childKeys = topLevelBcdKeysWalkable;
  }

  if (depth === 0) {
    return;
  }

  for (const key of childKeys) {
    yield* lowLevelWalk(data[key], joinPath(path, key), depth - 1);
  }
}

/**
 * Walk the tree of compat features from one or more starting points. Yields the path to each feature and the inner compat object.
 *
 * @param {string[]} [entryPoints] One or more dotted paths to traverse the tree from.
 * @yields {{path: string, compat: Object}} A path and `__compat` object
 */
function* walk(entryPoints) {
  if (entryPoints === undefined) {
    yield* lowLevelWalk();
  } else {
    entryPoints = Array.isArray(entryPoints) ? entryPoints : [entryPoints];

    for (const entryPoint of entryPoints) {
      yield* lowLevelWalk(query(entryPoint), entryPoint);
    }
  }
}

module.exports = walk;
