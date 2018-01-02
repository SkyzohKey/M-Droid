import { types } from './types';
import { pubkeys } from './pubkeys';

/**
 * This is the initial repos list. Might want to add Guardians one too.
 */
// eslint-disable-next-line valid-jsdoc
const initialState = {
  fetchRepositoryRequest: false,
  fetchRepositoryError: null,
  defaultRepositories: [
    'https://f-droid.org/repo', // Official F-Droid repo.
    // 'https://f-droid.org/archive', // Official F-Droid archives.
    'https://guardianproject.info/fdroid/repo', // The Guardian repo.
    'https://guardianproject.info/fdroid/archive', // The Guardian archives.
    'https://eutopia.cz/fdroid/repo', // Signal repo.
    'https://grobox.de/fdroid/repo', // Grobox repo.
    'https://microg.org/fdroid/repo', // MicroG repo.
    'https://briarproject.org/fdroid/repo',
    'http://fdroid.krombel.de/repo',
    'https://fdroid.copperhead.co/repo'
  ],
  reposCount: 0,
  reposFetched: 0,
  reposByPubkey: {},
  fetchComplete: false,
  errors: []
};

/**
 * A reduced to manage the repositories list.
 *
 * @param {Object} state - The initial state.
 * @param {Object} action - The actual action.
 * @return {Object} state - The new state.
 */
// eslint-disable-next-line no-unused-vars
const repositoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_REPOSITORIES_REQUEST:
      return {
        ...state,
        reposCount: action.count,
        reposFetched: 0
      };
    case types.FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        fetchComplete: true
      };
    case types.FETCH_REPOSITORIES_FAILURE:
      return {
        ...state,
        errors: [...state.errors, action.error]
      };
    case types.SET_REPOSITORY_DATA:
      return {
        ...state,
        fetchComplete: state.reposFetched - 1 >= state.reposCount,
        reposFetched: state.reposFetched + 1,
        reposByPubkey: {
          ...state.reposByPubkey,
          [action.repository.uuid]: {
            ...action.repository
          }
        }
      };
    case types.REMOVE_REPOSITORY:
      return {
        ...state,
        reposByPubkey: state.reposByPubkey.filter(repo => repo.uuid !== action.uuid)
      };
    default:
      return state;
  }
};

export default repositoriesReducer;
