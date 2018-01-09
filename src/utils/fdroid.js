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

/**
 * Given an application, returns localized meta.
 *
 * @param {Object} app - An Application object.
 * @return {Object} Returns an object with fields
 * `name`, `summary`, `description` & `screenshots` localized.
 */
export const getLocalized = app => {
  // TODO: Fetch locale from settings, or LocaleManager.
  const locale = 'en-US';

  let name = null;
  let summary = null;
  let description = null;
  let screenshots = null;

  const localizedData = app.localized;
  if (localizedData && localizedData.hasOwnProperty(locale)) {
    name = localizedData[locale].name;
    summary = localizedData[locale].summary;
    description = localizedData[locale].description;
    screenshots = localizedData[locale].phoneScreenshots;
  }

  return {
    name: name || app.name || null,
    summary: summary || app.summary || null,
    description: description || app.description || null,
    screenshots: screenshots || null
  };
};
