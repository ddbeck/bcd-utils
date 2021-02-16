const assert = require("assert");

const query = require("./query");

describe("query", function () {
  describe("non-existent feature", function () {
    it("should return the expected point in the tree (feature)", function () {
      const obj = query("api.HTMLAnchorElement.href");

      assert.ok("support" in obj.__compat);
      assert.ok("status" in obj.__compat);
      assert.strictEqual(
        "https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/href",
        obj.__compat.mdn_url
      );
    });

    it("should return the expected point in the tree (feature with children)", function () {
      const obj = query("api.HTMLAnchorElement");

      assert.ok("__compat" in obj);
      assert.ok("charset" in obj);
      assert.ok("href" in obj);
    });

    it("should throw an exception", function () {
      assert.throws(() => query("nonExistentNameSpace"), ReferenceError);
      assert.throws(() => query("api.NonExistentFeature"), ReferenceError);
      assert.throws(
        () => query("api.NonExistentFeature.subFeature"),
        ReferenceError
      );
    });
  });
});
