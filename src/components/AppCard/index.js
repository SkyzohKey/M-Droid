import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import { CachedImage } from 'react-native-cached-image';

import Touchable from '../Touchable';
import styles from './styles';

export default class AppCard extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    appSummary: PropTypes.string.isRequired,
    appIconPath: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const { width, height } = Dimensions.get('window');
    this.state = { width, height };
  }

  render() {
    const { appIconPath, appName, appSummary, onPress } = this.props;
    const containerWidth = {
      // 3 cards on the screen, minus margin/2 plus 15px (5*3) of the 4th card.
      width: this.state.width / 3 - styles.container.marginRight / 2 - 9
    };

    return (
      <View style={[styles.container, containerWidth]} onLayout={() => this.onLayout()}>
        <Touchable onPress={onPress}>
          <View style={styles.card}>
            <View style={styles.iconWrapper}>
              <CachedImage
                source={{ uri: appIconPath }}
                fallbackSource={require('../../assets/images/default-icon.png')}
                style={[styles.appIcon, { resizeMode: 'contain' }]}
              />
            </View>
            <Text numberOfLines={1} style={styles.appName}>
              {appName}
            </Text>
            <Text numberOfLines={1} style={styles.appSummary}>
              {appSummary}
            </Text>
          </View>
        </Touchable>
      </View>
    );
  }

  onLayout() {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  }
}
