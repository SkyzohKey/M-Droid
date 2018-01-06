import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

export default class SearchResultRow extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    appSummary: PropTypes.string.isRequired,
    appIconPath: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { appIconPath, appName, appSummary, onPress } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Touchable onPress={onPress} delayPressIn={0}>
            <View style={styles.resultContent}>
              <View style={styles.iconWrapper}>
                <FastImage
                  source={{ uri: appIconPath }}
                  style={styles.appIcon}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View style={styles.textsWrapper}>
                <Text numberOfLines={1} style={styles.appName}>
                  {appName}
                </Text>
                <Text numberOfLines={2} style={styles.appSummary}>
                  {appSummary}
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}
