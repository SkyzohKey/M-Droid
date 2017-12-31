import { types } from './types';

/**
 * This is the initial categories list.
 */
// eslint-disable-next-line valid-jsdoc
const initialState = {
  categoriesById: {
    0: { name: 'Science & Education', iconName: 'menu' },
    1: { name: 'Time', iconName: 'menu' },
    2: { name: 'Development', iconName: 'menu' },
    3: { name: 'System', iconName: 'menu' },
    4: { name: 'Security', iconName: 'menu' },
    5: { name: 'Internet', iconName: 'menu' },
    6: { name: 'Graphics', iconName: 'menu' },
    7: { name: 'Multimedia', iconName: 'menu' },
    8: { name: 'Navigation', iconName: 'menu' },
    9: { name: 'Money', iconName: 'menu' },
    10: { name: 'Sports & Health', iconName: 'menu' },
    11: { name: 'Reading', iconName: 'menu' },
    12: { name: 'Theming', iconName: 'menu' },
    13: { name: 'Games', iconName: 'menu' },
    14: { name: 'Connectivity', iconName: 'menu' },
    15: { name: 'Writing', iconName: 'menu' }
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
    default:
      return state;
  }
};

export default repositoriesReducer;
