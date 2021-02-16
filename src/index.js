if (process.env.BCD_UTILS_BCD_PACKAGE_PATH) {
  console.warn("Warning: loading BCD in development mode");
}

const bcd = require(process.env.BCD_UTILS_BCD_PACKAGE_PATH ||
  "@mdn/browser-compat-data");

function query(path, data = bcd) {
  const pathElements = path.split(".");
  let lookup = data;
  while (pathElements.length) {
    const next = pathElements.shift();
    lookup = lookup[next];
    if (lookup === undefined) {
      throw ReferenceError(
        `${path} is not a valid feature identifier (failed at '${next}')`
      );
    }
  }
  return lookup;
}

const walkableBcdKeys = [
  "api",
  "css",
  "html",
  "http",
  "javascript",
  "mathml",
  "webextensions",
  "xpath",
  "xslt",
];

function* walk(startingPoints = walkableBcdKeys, data = bcd) {
  // Convert string to array of strings
  if (!Array.isArray(startingPoints)) {
    startingPoints = [startingPoints];
  }

  for (const start of startingPoints) {
    const ns = query(start, data);

    if (isFeature(ns)) {
      yield {
        path: start,
        feature: ns.__compat,
      };
    }

    for (const key of descendantKeys(ns)) {
      yield* walk(`${start}.${key}`, data);
    }
  }
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

module.exports = {
  query,
  walk,
};
