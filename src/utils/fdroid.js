/**
 * Given an URL, returns a package name.
 * This method only works for http(s)://${website}/packages/${anything}/(.*)
 *
 * It is based on a regex so edge cases may occur, thus it can returns null.
 *
 * @param {String} url - A valid F-Droid packages/ uri.
 * @return {String} Returns a packageName from the given URL. Or null.
 */
export const getPackageNameForUrl = url => {
  const route = url.replace(/.*?:\/\//g, '');
  const packageName = route.match(/^.*\/?.*?\/?\/packages\/([^\/]+)(?:\/|\/index\.html)?$/)[1];

  return packageName || null;
};
