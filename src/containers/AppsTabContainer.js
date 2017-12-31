// import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from '../reducers/repositories/actions';
import AppTabs from '../components/AppTabs';

const mapStateToProps = (state, ownProps) => {
  return {
    // appsByCategoryName: state.applications.appsByCategoryName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestPress: () => {
      dispatch(fetchRepositories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTabs);
