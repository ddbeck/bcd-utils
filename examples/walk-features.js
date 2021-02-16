// Walk over every feature, print its identifier, and its description (if it has one)

const { walk } = require("..");

for (const { path, feature } of walk()) {
  if ("__compat" in feature) {
    console.log(`${path} (${feature.description})`);
  } else {
    console.log(`${path}`);
  }
}
