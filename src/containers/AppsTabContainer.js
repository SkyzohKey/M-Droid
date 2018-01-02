// import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from '../reducers/repositories/actions';
import AppsTab from '../components/AppsTab';

const mapStateToProps = (state, ownProps) => {
  return {
    // appsByCategoryName: state.applications.appsByCategoryName
    apps: state.applications.apps,
    fetchComplete: state.repositories.fetchComplete
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRepos: () => {
      dispatch(fetchRepositories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppsTab);
