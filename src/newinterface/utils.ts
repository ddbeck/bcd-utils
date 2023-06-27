import { SimpleSupportStatement, VersionValue } from '@mdn/browser-compat-data';

export class SupportStatement implements SimpleSupportStatement {
  data: SimpleSupportStatement;

  constructor(data: SimpleSupportStatement) {
    this.data = data;
  }

  get version_added(): VersionValue {
    return this.data.version_added;
  }

  get version_removed(): VersionValue {
    return this.data.version_removed ?? false;
  }
}

type RealValue = string | false;
// type NonRealValue = undefined | null | true;

class NonRealValueError extends Error {
  constructor(value: RealValue) {
    super();
    this.message = `${value} is not a real value`;
  }
}

function isRealValue(value: VersionValue): value is RealValue {
  // TODO: Write test for this
  // TODO: Handle valid `undefined` case for `version_removed`
  // TODO: Probably have to make `value` a `SimpleSupportStatement`?
  if (value === undefined || value === null || value === true) return false;
  return true;
}

export class RealSupportStatement extends SupportStatement {
  constructor(data: SimpleSupportStatement) {
    super(data);
    if (isRealValue(this.data.version_added)) {
      throw new NonRealValueError(this.data.version_added);
    }
  }
}
