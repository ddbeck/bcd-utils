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

module.exports = {
  query,
};
