import types from './types';
import { pubkeys } from './pubkeys';

/**
 * This is the initial repos list. Might want to add Guardians one too.
 */
// eslint-disable-next-line valid-jsdoc
const initialState = {
  reposByPubkey: {
    [pubkeys.fdroid]: {
      url: 'https://f-droid.org/repo',
      pubkey: pubkeys.fdroid,
      icon: 'fdroid-icon.png',
      name: 'F-Droid',
      description:
        'The official FDroid repository. Applications in this repository are built directly from the source code. (One, Firefox, is the official binary built by the Mozilla. This will ultimately be replaced by a source-built version.)', // eslint-disable-line
      version: 19,
      packages: []
    }
  }
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
    case types.SET_REPOSITORY_DATA:
      const { pubkey, url, icon, name, description, version } = action.repository;
      return {
        ...state,
        reposByPubkey: {
          ...state.repositories,
          [pubkey]: {
            url: url,
            pubkey: pubkey,
            icon: icon,
            name: name,
            description: description,
            version: version,
            packages: []
          }
        }
      };
    case types.REMOVE_REPOSITORY:
      const { pubkey } = action.repository;
      return {
        ...state,
        reposByPubkey: state.reposByPubkey.filter(repo => repo.pubkey !== pubkey)
      };
    default:
      return state;
  }
};
