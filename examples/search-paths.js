const { visit } = require('..');

const re = RegExp(process.argv[2], 'i');

console.log(`Searching: ${process.argv[2]}\n`);

visit(
  (path, feature) => console.log(`0. \`${path}\``, `(${feature.description})`),
  {
    test: (path, feature) => re.test(path) || re.test(feature.description),
  },
);
