// import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from '../reducers/repositories/actions';
import AppsList from '../components/AppsList';

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

export default connect(mapStateToProps, mapDispatchToProps)(AppsList);
