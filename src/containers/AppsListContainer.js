// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import AppsList from '../components/AppsList';

const mapStateToProps = (state, ownProps) => {
  return {
    // apps: state.applications.apps
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
    },
    openListing: (apps, name) => {
      dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'Listing',
        params: { apps: apps, name: name }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppsList);
