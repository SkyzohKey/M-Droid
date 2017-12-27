import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';

export default class HomeScreen extends Component {
  static propTypes = {
    repositories: PropTypes.object.isRequired,
    onTestPress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <Button title="Test!" onPress={() => this.props.onTestPress()} />;
  }
}
