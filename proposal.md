## Proposal: "Friendly" query API for BCD

## Pain

Working with BCD is _hard_.
Quick, answer me questions like this:

- Have Safari's last three releases supported `text-align-last`?
- Are Chrome, Firefox, and Safari all shipping `Array.at()`?
- On what date did all three of Chrome, Firefox, and Safari first support `display: grid`?

It's possible to do—all of the information is in BCD—but it's very very difficult to get this data out of BCD.

## Dream

## Fix

### `browser()`

```javascript
const b = browser('chrome');
b.releaseAt(0); // current release
b.releaseAt(-2); // two releases ago
b.releaseAt(1); // future release
b.releasesSince('2022-01-01'); // array of releases on or after the date
```

### `release()`

```javascript
const r = browser('chrome').releaseAt(0);
r.releaseDate === true;
r.current === true;
r.preview === false;
r.supports(feature('css.properties.gap')) = true; // simplified support status
```

### `feature()`

```javascript
const f = feature('css.properties.whatever');
f.supportedBy(release);
f.supportedBy(...manyReleases, { excludePartialImplementations: true });
f.notesFor(release);
f.notesFor(...manyReleases);
f.partialImplementationsFor(release);
```

### `note` object

// No factory for this one
n.release
n.noteText

An API that looks a bit like this:

```javascript
>>> const f = feature("css.properties.border-color")

// Get support at a specific version
>>> f.supportedBy("chrome", "100")
true

// Get support at a relative version
>>> f.supportedAt("firefox", -2)
true

// Get support an upcoming version
>>> f.supportedAt("firefox", 2);

// Get support at the current stable version
>>> f.supportedAt("chrome", 0)
true

// Or more simply
>>> f.supportedAt("chrome")

// What about several releases at once?
>>> f.supportedBy("chrome", ["100", "102", "103"]);

// Ugh typing out version numbers. That's annoying. Can't I just get a list of releases that a care about?
>>> const chrome = browser("chrome")
>>> chrome.since("2020-01-01");
["109", "108", "107", ...]

// Ah, there we go.
>>> f.supportedBy("chrome", ...chrome.since("2020-01-01"))
true

// That's a little duplicative though, isn't it?
>>> f.supportedByAll(chrome.)
```

```javascript
let r = browser('chrome').getReleaseOn('2020-01-01');
r.supports('css.properties.border-color');
r.notes('css.properties.border-color');

const releases = browser('chrome').getReleasesSince('2019-12-31');
releases.map(r => r.supports('css.properties.border-color'));
```

Future embellishments could include some of the following.

### Search

```javascript
const f = search('Array.prototype.at()');
```
