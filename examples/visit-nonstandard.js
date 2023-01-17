import { visit } from '..';

visit(
  function visitor(path, feature) {
    const std = feature.status.standard_track ? '✅' : '❗️';
    console.log(`${std} ${path}`);
  },
  {
    test: path => path.startsWith('api.RTC'),
  },
);
