import bcd from '@mdn/browser-compat-data' assert { type: 'json' };

/**
 * Get a subtree of compat data.
 *
 * @param {string} path Dotted path to a given feature (e.g., `css.properties.background`)
 * @param {*} [data=bcd] A tree to query. All of BCD, by default.
 * @returns {*} A BCD subtree
 * @throws {ReferenceError} For invalid identifiers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function query(path: string, data: Record<string, any> = bcd) {
  const pathElements = path.split('.');
  let lookup = data;

  while (pathElements.length) {
    const next = pathElements.shift();

    if (typeof next === 'undefined' || !(next in lookup)) {
      throw new ReferenceError(
        `${path} is not a valid tree identifier (failed at '${next}')`,
      );
    } else {
      lookup = lookup[next];
    }
  }
  return lookup;
}

export default query;
