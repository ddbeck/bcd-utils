const { query } = require("..");

console.log(format("api.Notification"));

function format(path) {
  const feat = query(path);

  const result = [];

  result.push(`Feature: ${path}`);

  if (feat.__compat.description) {
    result.push(`Description: \t${feat.__compat.description}`);
  }

  const children = Object.keys(feat).filter((k) => k !== "__compat");
  if (children.length) {
    result.push(`Children [${children.length}]: `);
    for (const child of children) {
      result.push(`- ${child}`);
    }
  }

  return result.join("\n");
}
