import { visit } from '..';

const results = {};

const toVisit = [
  'api',
  'css',
  'html',
  'http',
  'javascript',
  'mathml',
  'svg',
  'webdriver',
  'webextensions',
  'xpath',
  'xslt',
];

for (const key of toVisit) {
  let features = 0;
  let specs = 0;
  let nonStandard = 0;

  visit(
    (path, feature) => {
      features++;
      if (feature.spec_url) {
        specs++;
      }
      if (feature.status && !feature.status.standard_track) {
        nonStandard++;
      }
    },
    {
      entryPoint: key,
    },
  );

  results[key] = {
    total: features,
    withSpec: specs,
    nonStandard: nonStandard,
    specScore: specs / features,
    completeScore: (nonStandard + specs) / features,
  };
}

let total = 0;
let withSpec = 0;
let nonStandard = 0;

for (const value of Object.values(results)) {
  total += value.total;
  withSpec += value.withSpec;
  nonStandard += value.nonStandard;
}

results['total'] = {
  total,
  withSpec,
  nonStandard,
  specScore: withSpec / total,
  completeScore: (nonStandard + withSpec) / total,
};

const fnum = n =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n);

const headers = [
  'category',
  'features',
  'with spec URLs',
  'non-standard',
  '% with specs',
  '% complete',
];

function printHeaders() {
  console.log('| ' + headers.join(' | ') + ' |');
  let out = '';
  for (let index = 0; index < headers.length; index++) {
    out += '| --- ';
  }
  out += '|';
  console.log(out);
}

const e = (key, value) => {
  const strings = [
    key,
    fnum(value.total),
    fnum(value.withSpec),
    fnum(value.nonStandard),
    `${fnum(value.specScore * 100)}%`,
    `${fnum(value.completeScore * 100)}%`,
  ];

  console.log('| ' + strings.join(' | ') + ' |');
};

printHeaders();
for (const [key, value] of Object.entries(results)) {
  e(key, value);
}
