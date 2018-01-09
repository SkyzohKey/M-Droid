import { removeDuplicates } from '../../utils';

/**
 * Given an array of repos, returns a new array without duplicated
 * repositories, based on repo pubkey & name.
 *
 * @param {Array} repos - An array of Repositories.
 * @return {Array} Returns a new array without duplicates.
 */
export const getReposUniq = repos => {
  return removeDuplicates(repos, (item, t) => t.pubkey === item.pubkey && t.name === item.name);
};
