const assert = require("assert");

const bcd = require("./bcd");
const { walk } = require("./index");

describe("walk", function () {
  it("should walk a single tree", function () {
    let results = Array.from(walk("api.Notification"));
    assert.strictEqual(results.length, 27);
    assert.strictEqual(results[0].path, "api.Notification");
    assert.strictEqual(results[1].path, "api.Notification.Notification");
  });

  it("should walk multiple trees", function () {
    let results = Array.from(
      walk(["api.Notification", "css.properties.color"])
    );
    assert.strictEqual(results.length, 28);
    assert.strictEqual(results[0].path, "api.Notification");
    assert.strictEqual(
      results[results.length - 1].path,
      "css.properties.color"
    );
  });

  it("should emit every feature", function () {
    const featureCountFromString = JSON.stringify(bcd, undefined, 2)
      .split("\n")
      .filter((line) => line.includes("__compat")).length;
    const featureCountFromWalk = Array.from(walk()).length;

    assert.strictEqual(featureCountFromString, featureCountFromWalk);
  });
});
