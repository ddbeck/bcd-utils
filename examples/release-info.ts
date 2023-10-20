import { query } from '../build/index.js';

const [browserId, version] = process.argv.slice(2, 4);

const browser = query(`browsers.${browserId}`);
const release = browser.releases[version];

console.log(browser);
console.log(version);
console.log(release);
