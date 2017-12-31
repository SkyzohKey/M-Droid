// @flow
import { combineReducers } from 'redux';

// Let's import our own reducers.
import repositoriesReducer from './repositories';
import applicationsReducer from './applications';

/**
 * @param {Reducer} navigationReducer - The navigation reducer built during app init.
 * @return {Reducer} returns a combined reducer.
 */
export const getRootReducer = navigationReducer => {
  return combineReducers({
    navigation: navigationReducer,
    repositories: repositoriesReducer,
    applications: applicationsReducer
  });
};

export default getRootReducer;
