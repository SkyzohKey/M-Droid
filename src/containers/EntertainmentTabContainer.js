// import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRepositories } from '../reducers/repositories/actions';
import EntertainmentTab from '../components/EntertainmentTab';

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

export default connect(mapStateToProps, mapDispatchToProps)(EntertainmentTab);
