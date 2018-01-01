// import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from '../reducers/repositories/actions';
import AppDetailsScreen from '../components/AppDetailsScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    apps: state.applications.apps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestPress: () => {
      dispatch(fetchRepositories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppDetailsScreen);
