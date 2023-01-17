import { visit, iterSupport } from '..';

function hasFlags(supportStatement) {
  return Array.isArray(supportStatement.flags);
}

function hasVersionRemoved(supportStatement) {
  return 'version_removed' in supportStatement;
}

const browserId = 'firefox';
const flagName = 'dom.w3c_pointer_events.enabled';
const features = [];

visit(
  path => {
    features.push(path);
  },
  {
    entryPoint: 'api',
    test: (path, feature) => {
      const unremovedFlaggedStatements = iterSupport(feature, browserId)
        .filter(statement => !hasVersionRemoved(statement))
        .filter(hasFlags);

      const hasPointerEventFlag = unremovedFlaggedStatements.filter(
        statement => {
          for (const flag of statement.flags) {
            if (flag.name === flagName) {
              return true;
            }
          }
          return false;
        },
      );

      return hasPointerEventFlag.length > 0;
    },
  },
);

console.log(
  `The following ${features.length} features have the flag ${flagName}:`,
);
for (const feat of features) {
  console.log(feat);
}
