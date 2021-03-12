const { visit } = require('../src/index.js');

visit(
  undefined,
  path => {
    return path.startsWith('api.RTC');
  },
  (path, feature) => {
    const std = feature.status.standard_track ? '✅' : '❗️';
    console.log(`${std} ${path}`);
  },
);
