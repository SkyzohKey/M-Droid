// @flow
import { types } from './types';
import * as repoService from '../../services/RepositoryService';

export const fetchRepositories = () => {
  return (dispatch, getState) => {
    const { defaultRepositories } = getState().repositories;
    dispatch({ type: types.FETCH_REPOSITORIES_REQUEST, count: defaultRepositories.length });

    // TODO: Loop over the repositories.
    for (i = 0, l = defaultRepositories.length; i < l; i++) {
      const repo = defaultRepositories[i];
      if (repo === undefined) {
        continue;
      }

      repoService
        .getRepositoryAsync(repo)
        .then(response => {
          dispatch({ type: types.SET_REPOSITORY_DATA, repository: response });
        })
        .catch(err => {
          dispatch({
            type: types.FETCH_REPOSITORIES_FAILURE,
            error: repo + ': ' + err.message
          });
        });
    }

    dispatch({ type: types.ADD_REPOSITORY_SUCCESS });
  };
};

/**
 * An action creator that update the existing repositories.
 *
 * @return {Function} returns a thunk that fetchs over the repositories,
 * it then trigger `SET_REPOSITORY_DATA` for each repo updated.
 */
export const updateRepositories = () => {
  return (dispatch, getState) => {
    const { reposByPubkey } = getState().repositories;
    for (let repo of reposByPubkey) {
      // TODO: Call the RepoService and update data.
    }
  };
};

/**
 * An action creator that set data for a given repository.
 *
 * @param {String} url - The repository's base URL. ie. `https://f-droid.org/repo`.
 * @param {String} pubkey - The repository's pubkey, for verifying integrity.
 * @param {String} name - The repository's name.
 * @param {String} description - A 255-char max description of the repository.
 * @param {String} version - Repository's version code. ie. `19`.
 * @param {String} icon - The icon path, relative to base URL.
 * @param {Array} packages - A list of packages that a repository holds.
 * @return {Function} returns a thunk dispatching a `SET_REPOSITORY_DATA`action.
 */
export const setRepositoryData = (url, pubkey, name, description, version, icon, packages) => {
  return dispatch => {
    dispatch({
      // TODO: Fetch the url and parse xml to get the infos.
      type: types.SET_REPOSITORY_DATA,
      url: url,
      pubkey: pubkey,
      name: name,
      description: description,
      version: version,
      icon: icon,
      packages: packages || []
    });
  };
};

/**
 * An action creator that add a new repository to the user's app.
 *
 * @param {String} url - The repository's base URL. ie. `https://f-droid.org/repo`
 * @return {Function} returns a thunk containing the fetched repository's infos.
 */
export const addRepository = url => {
  return dispatch => {
    // TODO: Fetch the url and parse xml to get the infos.

    try {
      dispatch({ type: types.ADD_REPOSITORY_REQUEST });
      dispatch({ type: types.ADD_REPOSITORY_SUCCESS });
    } catch (e) {
      dispatch({ type: types.ADD_REPOSITORY_FAILURE });
    }

    dispatch(setRepositoryData(url, null, null, null, null, null, null));
  };
};

/**
 * An action creator that deletes a repository based on it's public key.
 *
 * @param {String} pubkey - The repository's pubkey.
 * @return {Function} returns a thunk containing a DELETE_REPOSITORY action and the pubkey.
 */
export const deleteRepository = pubkey => {
  return dispatch => {
    dispatch({
      type: types.DELETE_REPOSITORY,
      pubkey: pubkey
    });
  };
};
