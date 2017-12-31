import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class AppTabs extends Component {
  static navigationOptions = {
    tabBarLabel: 'APPS & GAMES'
    // tabBarIcon: ({ tintColor }) => <Icon name="recent-actors" size={22} color={tintColor} />
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>APPS & GAMES.</Text>
      </View>
    );
  }
}
