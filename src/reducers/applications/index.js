import { types } from './types';

// eslint-disable-next-line valid-jsdoc
const initialState = {
  apps: []
};

/**
 * A reduced to manage the applications list.
 *
 * @param {Object} state - The initial state.
 * @param {Object} action - The actual action.
 * @return {Object} state - The new state.
 */
// eslint-disable-next-line no-unused-vars
const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_APPLICATIONS_DATA:
      // Ensure we don't store duplicate apps. Better RAM usage.
      return {
        ...state,
        apps: [...state.apps, ...action.applications]
      };
    default:
      return state;
  }
};

export default applicationsReducer;
