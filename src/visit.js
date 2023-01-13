import bcd from '@mdn/browser-compat-data' assert { type: 'json' };
import query from './query.js';
import { descendantKeys, joinPath, isFeature } from './walkingUtils.js';

const BREAK = Symbol('break');
const CONTINUE = Symbol('continue');

function visit(visitor, options = {}) {
  const { entryPoint, data } = options;
  const test = options.test !== undefined ? options.test : () => true;

  const tree = entryPoint === undefined ? bcd : query(entryPoint, data);

  let outcome;
  if (isFeature(tree) && test(entryPoint, tree.__compat)) {
    outcome = visitor(entryPoint, tree.__compat);
  }
  if (outcome === BREAK) {
    return outcome;
  }
  if (outcome !== CONTINUE) {
    for (const key of descendantKeys(tree)) {
      const suboutcome = visit(visitor, {
        entryPoint: joinPath(entryPoint, key),
        test,
        data,
      });
      if (suboutcome === BREAK) {
        return suboutcome;
      }
    }
  }
  return outcome;
}

visit.BREAK = BREAK;
visit.CONTINUE = CONTINUE;

export default visit;
