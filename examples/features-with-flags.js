const { iterSupport, visit } = require('../src/index.js');

function hasFlags(compat, browser) {
  for (const statement of iterSupport(compat, browser)) {
    if ('flags' in statement) {
      return true;
    }
  }
  return false;
}

const browserId = 'safari';

visit(
  (path, compat) => {
    console.log(path);
    console.log(compat.support[browserId]);
  },
  {
    entryPoint: 'api',
    test: (path, compat) => hasFlags(compat, browserId),
  },
);
