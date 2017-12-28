// import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from '../reducers/repositories/actions';
import HomeScreen from '../components/HomeScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    reposByPubkey: state.repositories.reposByPubkey,
    reposCount: state.repositories.reposCount,
    reposFetched: state.repositories.reposFetched,
    defaultRepositories: state.repositories.defaultRepositories,
    errors: state.repositories.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestPress: () => {
      dispatch(fetchRepositories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
