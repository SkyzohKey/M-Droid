// import React, { Component } from 'react';
import { connect } from 'react-redux';

import { testRepoService } from '../reducers/repositories/actions';
import HomeScreen from '../components/HomeScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    repositories: state.repositories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestPress: () => {
      dispatch(testRepoService());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
