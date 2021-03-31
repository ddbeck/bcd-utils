let requireId = '@mdn/browser-compat-data';

if (process.env.BCD_UTILS_BCD_PACKAGE_PATH) {
  console.warn('Warning: loading BCD from alternate path');
  requireId = process.env.BCD_UTILS_BCD_PACKAGE_PATH;
}

const bcd = require(requireId);

module.exports = bcd;
