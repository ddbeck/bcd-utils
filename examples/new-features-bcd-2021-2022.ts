import assert from 'assert/strict';
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

const headings = [
  'Feature',
  'Chrome as of June 2020',
  'Edge as of June 2020',
  'Firefox as of June 2020',
  'Safari as of June 2020',
  'Chrome as of June 2021',
  'Edge as of June 2021',
  'Firefox as of June 2021',
  'Safari as of June 2021',
].join('\t');

console.log(headings);

for (const { path } of walk()) {
  const f = feature(path);

  const result = {
    key: f.id,
    chrome_supported_before_1_june_2020: supportedBy(f, cr.release('83')),
    edge_supported_before_1_june_2020: supportedBy(f, ed.release('83')),
    firefox_supported_before_1_june_2020: supportedBy(f, fx.release('76')),
    safari_supported_before_1_june_2020: supportedBy(f, sa.release('13.1')),
    chrome_supported_by_31_may_2021: supportedBy(f, cr.release('91')),
    edge_supported_by_31_may_2021: supportedBy(f, ed.release('91')),
    firefox_supported_by_31_may_2021: supportedBy(f, fx.release('88')),
    safari_supported_by_31_may_2021: supportedBy(f, sa.release('14.1')),
  };

  const one_or_more_was_unsupported = [
    result.chrome_supported_before_1_june_2020,
    result.edge_supported_before_1_june_2020,
    result.firefox_supported_before_1_june_2020,
    result.safari_supported_before_1_june_2020,
  ].some(v => v === false);

  const from_june_2021_all_supported = [
    result.chrome_supported_by_31_may_2021,
    result.edge_supported_by_31_may_2021,
    result.firefox_supported_by_31_may_2021,
    result.safari_supported_by_31_may_2021,
  ].every(v => v === true);

  const keys = Object.keys(result).join('\t');
  const row = Object.values(result).join('\t');

  if (one_or_more_was_unsupported && from_june_2021_all_supported) {
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
