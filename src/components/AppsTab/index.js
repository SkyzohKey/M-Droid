import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import AppsListContainer from '../../containers/AppsListContainer';
import styles from './styles';

export default class AppsTab extends Component {
  static navigationOptions = {
    tabBarLabel: 'APPS & GAMES'
    // tabBarIcon: ({ tintColor }) => <Icon name="recent-actors" size={22} color={tintColor} />
  };

  static propTypes = {
    fetchRepos: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchRepos();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppsListContainer />
      </View>
    );
  }
}
