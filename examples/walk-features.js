// Walk over every feature, print its identifier, and its description (if it has one)

const { walk } = require("..");

for (const { path, compat } of walk()) {
  if ("description" in compat) {
    console.log(`${path} (${compat.description})`);
  } else {
    console.log(`${path}`);
  }
}
