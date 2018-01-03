// import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from '../reducers/repositories/actions';
import SearchScreen from '../components/SearchScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    apps: state.applications.apps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDetails: app => {
      dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'AppDetails',
        params: { app: app }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
