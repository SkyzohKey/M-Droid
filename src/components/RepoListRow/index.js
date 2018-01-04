import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Switch } from 'react-native';
import { CachedImage } from 'react-native-cached-image';

import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

export default class RepoListRow extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    iconPath: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    isLatestRow: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { iconPath, name, summary, enabled, isLatestRow, onPress, onSwitch } = this.props;

    const lastRowStyle =
      isLatestRow === false
        ? null
        : {
            borderBottomWidth: 0
          };

    return (
      <View style={styles.container}>
        <View style={[styles.row, lastRowStyle]}>
          <Touchable onPress={onPress} delayPressIn={0}>
            <View style={styles.rowContent}>
              <View style={styles.iconWrapper}>
                <CachedImage
                  fadeDuration={0}
                  source={{ uri: iconPath }}
                  fallbackSource={require('../../assets/images/default-icon.png')}
                  style={styles.icon}
                  activityIndicatorProps={{ size: 'large', color: sharedStyles.ACCENT_COLOR }}
                />
              </View>
              <View style={styles.textsWrapper}>
                <Text numberOfLines={1} style={styles.name}>
                  {name}
                </Text>
                <Text numberOfLines={2} style={styles.summary}>
                  {summary}
                </Text>
              </View>
              <Switch
                thumbTintColor={sharedStyles.ACCENT_COLOR}
                onTintColor={sharedStyles.ACCENT_COLOR_LIGHT}
                value={enabled}
                onValueChange={() => onSwitch()}
              />
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}
