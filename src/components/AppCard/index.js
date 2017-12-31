import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import Touchable from '../Touchable';

import styles from './styles';

export default class AppCard extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    appIconPath: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { appIconPath, appName, onPress } = this.props;

    return (
      <View style={styles.container}>
        <Touchable onPress={onPress}>
          <View style={styles.card}>
            <Image source={{ uri: appIconPath }} style={styles.appIcon} />
            <Text style={styles.appName}>{appName}</Text>
          </View>
        </Touchable>
      </View>
    );
  }
}
