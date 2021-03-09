const { visit } = require("..");

visit(
  undefined,
  () => true,
  (path, compat) => {
    if (
      compat.status !== undefined &&
      compat.status.standard_track === false &&
      compat.spec_url === undefined
    ) {
      console.log(path);
    }
  }
);
