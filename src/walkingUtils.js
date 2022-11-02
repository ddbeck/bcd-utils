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
  return Object.keys(obj).includes('version') && Object.keys(obj).length == 1;
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

module.exports = {
  descendantKeys,
  isBrowser,
  isFeature,
  isMeta,
  joinPath,
};
