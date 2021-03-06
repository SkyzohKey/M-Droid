// @flow
import { types } from './types';
import { types as appTypes } from '../applications/types';
import { removeDuplicates } from '../../utils';
import * as repoService from '../../services/RepositoryService';

/**
 * Fetch a specified set of url from the store then update the store
 * with actual repositories data.
 *
 * @returns {Function} returns a thunk dispatching a different action on success/error.
 */
export const fetchRepositories = () => {
  return (dispatch, getState) => {
    const { defaultRepositories, reposFetched, reposCount } = getState().repositories;
    const { apps } = getState().applications;

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
          if (response.success) {
            dispatch({ type: types.SET_REPOSITORY_DATA, repository: response.meta });

            const appUniq = removeDuplicates(
              [...apps, ...response.applications],
              (item, t) => t.id === item.id
            );

            dispatch({
              type: appTypes.SET_APPLICATIONS_DATA,
              applications: appUniq
            });
          } else {
            dispatch({
              type: types.FETCH_REPOSITORIES_FAILURE,
              error: response.error
            });
          }
        })
        .catch(err => {
          console.log('Errored at repo', repo, err);
          dispatch({
            type: types.FETCH_REPOSITORIES_FAILURE,
            error: repo + ': ' + err.message
          });
        });
    }
  };
};

export const toggleRepository = repository => {
  return (dispatch, getState) => {
    const { reposByPubkey } = getState().repositories;
    const repo = reposByPubkey[repository.pubkey];
    dispatch({
      type: types.SET_REPOSITORY_ENABLED,
      repository: repository,
      enabled: !repo.enabled
    });
  };
};

/**
 * An action creator that deletes a repository based on it's UUID.
 *
 * @param {String} uuid - The repository's uuid.
 * @return {Function} returns a thunk containing a DELETE_REPOSITORY action and the uuid.
 */
export const deleteRepository = uuid => {
  return dispatch => {
    dispatch({
      type: types.DELETE_REPOSITORY,
      uuid: uuid
    });
  };
};
