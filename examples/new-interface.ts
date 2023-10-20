import { feature } from '../build/newinterface/feature.js';
import { browser } from '../build/newinterface/browser.js';

const features = [
  feature('css.properties.display.grid'),
  feature('css.properties.grid'),
];

const baselineBrowsers = ['chrome', 'edge', 'firefox', 'safari'].map(b =>
  browser(b),
);

const baselineReleases = baselineBrowsers.flatMap(browser => [
  browser.releaseAt(-1),
  browser.releaseAt(-2),
]);

for (const release of baselineReleases) {
  console.log(`${release?.browser.name} ${release?.version}`);
}
