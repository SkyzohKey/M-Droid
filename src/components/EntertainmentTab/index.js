import React, { Component } from 'react';
import { View } from 'react-native';

import EmptyPlaceholder from '../EmptyPlaceholder';
import styles from './styles';

export default class AppTabs extends Component {
  static navigationOptions = {
    tabBarLabel: 'ENTERTAINMENT'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <EmptyPlaceholder
          icon={'beach'}
          title={'So you wanna some entertainment?'}
          tagline={'Guess what? You failed.'}
          note={'This feature is coming soon, don\'t worry!'}
        />
      </View>
    );
  }
}
