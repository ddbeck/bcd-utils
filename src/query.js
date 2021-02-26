const bcd = require("./bcd");

function query(path, data = bcd) {
  const pathElements = path.split(".");
  let lookup = data;
  while (pathElements.length) {
    const next = pathElements.shift();
    lookup = lookup[next];
    if (lookup === undefined) {
      throw ReferenceError(
        `${path} is not a valid tree identifier (failed at '${next}')`
      );
    }
  }
  return lookup;
}

module.exports = query;
