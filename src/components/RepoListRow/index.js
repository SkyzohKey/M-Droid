import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Switch } from 'react-native';
import FastImage from 'react-native-fast-image';

import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

class RepoListRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { iconPath, name, summary, enabled, isLatestRow, onPress, onSwitch } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.row]}>
          <Touchable onPress={onPress} delayPressIn={0}>
            <View style={styles.rowContent}>
              <View style={styles.iconWrapper}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={{ uri: iconPath }}
                  style={styles.icon}
                />
              </View>
              <View style={[styles.borderWrapper, this.getRowStyle()]}>
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
            </View>
          </Touchable>
        </View>
      </View>
    );
  }

  getRowStyle() {
    const { isLatestRow } = this.props;
    if (isLatestRow === false) {
      return null;
    }

    return {
      borderBottomWidth: 0
    };
  }
}

RepoListRow.propTypes = {
  name: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  isLatestRow: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired
};

export default RepoListRow;
