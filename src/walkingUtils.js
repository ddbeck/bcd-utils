function joinPath() {
  return Array.from(arguments).filter(Boolean).join('.');
}

function isFeature(obj) {
  return '__compat' in obj;
}
function isBrowser(obj) {
  return 'name' in obj && 'releases' in obj;
}

function isMeta(obj) {
  const expectedKeys = ['timestamp', 'version'];
  const actualKeys = Object.keys(obj);

  for (const key of expectedKeys) {
    if (!actualKeys.includes(key)) {
      return false;
    }
  }

  for (const key of actualKeys) {
    if (!expectedKeys.includes(key)) {
      return false;
    }
  }

  return true;
}

function descendantKeys(data) {
  if (isFeature(data)) {
    return Object.keys(data).filter(key => key !== '__compat');
  }

  if (isBrowser(data) || isMeta(data)) {
    // Browsers never have independently meaningful descendants
    return [];
  }

  return Object.keys(data);
}

export { descendantKeys, isBrowser, isFeature, isMeta, joinPath };
