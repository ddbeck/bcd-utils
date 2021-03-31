const { visit, iterSupport } = require('../src/index.js');

visit(path => console.log(path), {
  test: (path, feature) => {
    for (const browser of Object.keys(feature.support)) {
      for (const statement of iterSupport(feature, browser)) {
        if ([null, false].includes(statement.version_removed)) {
          return true;
        }
      }
    }
    return false;
  },
});
