import { removeDuplicates } from '../../utils';

/**
 * Given an array of apps, returns a new array without duplicated
 * applications, based on app id & app name.
 *
 * @param {Array} apps - An array of Applications.
 * @return {Array} Returns a new array without duplicates.
 */
export const getAppsUniq = apps => {
  return removeDuplicates(apps, (item, t) => t.id === item.id && t.name === item.name);
};

/**
 * Given an array of apps and a category name, returns a new array
 * containing apps that belongs to that category.
 * Results are return free of duplicates.
 *
 * @param {Array} apps - An array of Applications.
 * @param {String} categoryName - A category name.
 * @return {Array} Returns a new array of apps belonging to the category.
 */
export const getAppsForCategory = (apps, categoryName) => {
  return getAppsUniq(apps.filter(app => app.category === categoryName));
};

/**
 * Given an array of apps, returns a new array of feature apps.
 * Apps are featured if they provides a featureGraphic.
 * Results are return free of duplicates.
 *
 * @param {Array} apps - An array of Applications.
 * @return {Array} Returns a new array of featureApps.
 */
export const getFeaturedApps = apps => {
  return getAppsUniq(apps.filter(app => app.featureGraphic !== null));
};
