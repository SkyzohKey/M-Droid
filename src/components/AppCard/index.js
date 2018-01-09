import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

export default class AppCard extends Component {
  static propTypes = {
    appName: PropTypes.string,
    appSummary: PropTypes.string,
    appIconPath: PropTypes.string,
    horizontal: PropTypes.bool,
    offset: PropTypes.number,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    appName: '',
    appSummary: '',
    appIconPath: '',
    horizontal: true,
    offset: 3
  };

  constructor(props) {
    super(props);

    const { width, height } = Dimensions.get('window');
    this.state = { width, height };
  }

  render() {
    const { appIconPath, appName, appSummary, onPress } = this.props;
    if (appName === null || appName.trim() === '') {
      return null;
    }

    const halfPadding = this.props.offset > 2 ? 4 : 0;
    const cardWidth = this.state.width / this.props.offset - halfPadding;
    const paddingStyle = this.props.horizontal
      ? {
          paddingRight: this.props.isLast ? 16 : 4,
          paddingLeft: this.props.isFirst ? 16 : 4,
          paddingVertical: 0,
          width: cardWidth,
          minWidth: cardWidth
          // maxWidth: cardWidth
        }
      : {
          margin: 1,
          width: cardWidth,
          minWidth: cardWidth
        };

    return (
      <View style={[styles.container, paddingStyle]} onLayout={() => this.onLayout()} elevation={2}>
        <View style={styles.card}>
          <Touchable onPress={onPress} delayPressIn={0}>
            <View style={styles.cardContent}>
              <View style={styles.iconWrapper}>
                <FastImage fadeDuration={0} source={{ uri: appIconPath }} style={styles.appIcon} />
              </View>
              <Text numberOfLines={1} style={styles.appName}>
                {appName}
              </Text>
              <Text numberOfLines={2} style={styles.appSummary}>
                {appSummary}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }

  onLayout() {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  }
}
