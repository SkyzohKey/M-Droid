// import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from '../reducers/repositories/actions';
import ReposHomeScreen from '../components/ReposHomeScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    repos: state.repositories.reposByPubkey
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDetails: repoKey => {
      dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'RepoDetails',
        params: { app: repoKey }
      });
    },
    refreshRepositories: () => {
      dispatch(fetchRepositories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReposHomeScreen);
