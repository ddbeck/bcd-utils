import { walk } from '../build/index.js';
import { Release, browser } from '../build/newinterface/browser.js';
import { Feature, feature } from '../build/newinterface/feature.js';
import { NonRealValueError } from '../build/newinterface/statement.js';

const cr = browser('chrome');
const ed = browser('edge');
const fx = browser('firefox');
const sa = browser('safari');

function supportedBy(feature: Feature, release: Release) {
  try {
    return feature.supportedBy(release);
  } catch (err) {
    if (err instanceof NonRealValueError) {
      return true;
    }
    throw err;
  }
}

const startDateString = '31 Dec 2022';
const endDateString = '13 Oct 2023';

const headings = [
  'Feature',
  `Chrome as of ${startDateString}`,
  `Edge as of ${startDateString}`,
  `Firefox as of ${startDateString}`,
  `Safari as of ${startDateString}`,
  `Chrome as of ${endDateString}`,
  `Edge as of ${endDateString}`,
  `Firefox as of ${endDateString}`,
  `Safari as of ${endDateString}`,
].join('\t');

console.log(headings);

for (const { path } of walk()) {
  // if (path !== 'api.CSSCounterStyleRule') {
  //   continue;
  // }
  const f = feature(path);

  const result = {
    key: f.id,
    chrome_supported_at_start: supportedBy(f, cr.releaseFromVersion('108')),
    edge_supported_at_start: supportedBy(f, ed.releaseFromVersion('108')),
    firefox_supported_at_start: supportedBy(f, fx.releaseFromVersion('108')),
    safari_supported_at_start: supportedBy(f, sa.releaseFromVersion('16.2')),
    chrome_supported_at_end: supportedBy(f, cr.releaseFromVersion('118')),
    // edge_supported_at_end: supportedBy(f, ed.releaseFromVersion('118')),
    edge_supported_at_end: supportedBy(f, ed.releaseFromVersion('117')),
    firefox_supported_at_end: supportedBy(f, fx.releaseFromVersion('118')),
    safari_supported_at_end: supportedBy(f, sa.releaseFromVersion('17')),
  };
  // console.log(result);

  const unsupported_by_one_at_start = [
    result.chrome_supported_at_start,
    result.edge_supported_at_start,
    result.firefox_supported_at_start,
    result.safari_supported_at_start,
  ].some(v => v === false);

  const supported_by_all_at_end = [
    result.chrome_supported_at_end,
    result.edge_supported_at_end,
    result.firefox_supported_at_end,
    result.safari_supported_at_end,
  ].every(v => v === true);

  // const keys = Object.keys(result).join('\t');
  const row = Object.values(result).join('\t');

  if (unsupported_by_one_at_start && supported_by_all_at_end) {
    // console.log(f.id);

    // console.log(f.supportStatements(cr));
    // console.log(supportedBy(f, cr.release('102')));
    // console.log(f.supportStatements(ed));
    // console.log(f.supportStatements(fx));
    // console.log(f.supportStatements(sa));

    // console.log(headings);
    // console.log(keys);
    console.log(row);
    // process.exit(1);
  }
}

// TODO: required releases array
// For each browser:
// - The release on June 1st 2021: b.releaseOn("2021-06-01")
// - The current stable release: b.releaseAt(0)

// TODO: version added must be in this set of releases
// For each browser:
// - The releases from 1 June 2020 to 31 May 2021
