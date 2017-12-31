import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class AppTabs extends Component {
  static navigationOptions = {
    tabBarLabel: 'ENTERTAINMENT'
    // tabBarIcon: ({ tintColor }) => <Icon name="recent-actors" size={22} color={tintColor} />
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ENTERTAINMENT</Text>
      </View>
    );
  }
}
