const bcd = require("./bcd");
const query = require("./query");

const walkableBcdKeys = [...Object.keys(bcd).filter((k) => k !== "browsers")];

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

module.exports = walk;
