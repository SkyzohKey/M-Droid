import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

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
        <Icon name={'emoji-flirt'} size={105} color={'rgba(0,0,0,.54)'} />
        <Text style={styles.header}>So you wanna some entertainment?</Text>
        <Text style={styles.punchline}>Guess what? You failed.</Text>
        <Text style={styles.meaculpa}>This feature is coming soon, don't worry!</Text>
      </View>
    );
  }
}
