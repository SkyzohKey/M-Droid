import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import expect from 'expect';
import { mockResponse } from '../../utils/tests';

import * as actions from './repos.actions';
import * as types from './repos.types';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  reposList: [
    { url: 'http://grobox.de/fdroid/repo', isEnabled: true },
    { url: 'http://grobox.de/fdroid/archive', isEnabled: false }
  ],
  activeRepos: {}
};

describe('Repositories reducer actions', () => {
  it('has a defined but empty initial state', () => {
    const store = mockStore(initialState);
    expect(store).toEquals(initialState);
  });

  it('should create an action to add a repository WITHOUT public key', () => {
    const url = 'http://grobox.de/fdroid/repo';
    const expectedAction = {
      type: types.ADD_REPOSITORY,
      payload: {
        url,
        pubkey: null
      }
    };

    expect(actions.addRepository(url)).toEqual(expectedAction);
  });

  it('should create an action to add a repository WITH public key', () => {
    const url = 'http://grobox.de/fdroid/repo';
    const pubkey = 'pubkey';
    const expectedAction = {
      type: types.ADD_REPOSITORY,
      payload: {
        url,
        pubkey
      }
    };

    expect(actions.addRepository(url)).toEqual(expectedAction);
  });

  it('should create an action to delete a repository', () => {
    const pubkey = 'pubkey';
    const expectedAction = {
      type: types.REMOVE_REPOSITORY,
      payload: {
        pubkey: pubkey
      }
    };

    expect(actions.removeRepository(pubkey)).toEqual(expectedAction);
  });

  it('should create an action to enable a repository', () => {
    const pubkey = 'pubkey';
    const expectedAction = {
      type: types.ENABLE_REPOSITORY,
      payload: {
        pubkey
      }
    };

    expect(actions.removeRepository(pubkey)).toEqual(expectedAction);
  });

  it('should create an action to disable a repository', () => {
    const pubkey = 'pubkey';
    const expectedAction = {
      type: types.DISABLE_REPOSITORY,
      payload: {
        pubkey
      }
    };

    expect(actions.removeRepository(pubkey)).toEqual(expectedAction);
  });
});
