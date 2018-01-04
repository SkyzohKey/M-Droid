import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-cached-image';

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
          <Touchable onPress={onPress}>
            <View style={styles.resultContent}>
              <View style={styles.iconWrapper}>
                <CachedImage
                  fadeDuration={0}
                  source={{ uri: appIconPath }}
                  fallbackSource={require('../../assets/images/default-icon.png')}
                  style={styles.appIcon}
                  activityIndicatorProps={{ size: 'large', color: sharedStyles.ACCENT_COLOR }}
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
