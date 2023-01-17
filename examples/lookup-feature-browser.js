import { query } from '..';

import { argv } from 'node:process';

const [feature, browser] = argv.slice(2);

const data = query(feature).__compat.support[browser];

console.log(JSON.stringify(data));
