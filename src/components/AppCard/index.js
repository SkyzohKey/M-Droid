import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

import Touchable from '../Touchable';
import styles from './styles';

const PADDING_LEFT_FIRST = 16;
const PADDING_RIGHT_LAST = 16;
const PADDING_DEFAULT = 8;
const CARD_EXTRA = PADDING_DEFAULT / 2;

class AppCard extends Component {
  constructor(props) {
    super(props);

    const { width, height } = Dimensions.get('window');
    this.state = { width, height };
  }

  render() {
    const { appName } = this.props;
    if (appName === null || appName.trim() === '') {
      return null;
    }

    const { appIconPath, appSummary, onPress } = this.props;
    return (
      <View
        style={[styles.container, this.getPaddingStyle()]}
        elevation={2}
        onLayout={() => this.onLayout()}
      >
        <View style={styles.card}>
          <Touchable onPress={onPress} delayPressIn={0}>
            <View style={styles.cardContent}>
              <View style={styles.iconWrapper}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={{ uri: appIconPath }}
                  style={styles.appIcon}
                />
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

  getPaddingStyle() {
    const { horizontal, isLast, isFirst, offset, containerCols } = this.props;
    const halfPadding = offset > containerCols ? PADDING_DEFAULT / 2 : 0;
    const cardWidth = this.state.width / (offset - halfPadding) - CARD_EXTRA;

    if (horizontal) {
      const paddingRight = isLast ? PADDING_RIGHT_LAST : PADDING_DEFAULT / 2;
      const paddingLeft = isFirst ? PADDING_LEFT_FIRST : PADDING_DEFAULT / 2;
      return {
        paddingRight: containerCols === 1 ? 0 : paddingRight,
        paddingLeft: paddingLeft,
        paddingVertical: 0,
        width: cardWidth
      };
    }

    return {
      margin: 0,
      width: cardWidth
    };
  }
}

AppCard.propTypes = {
  appName: PropTypes.string,
  appSummary: PropTypes.string,
  appIconPath: PropTypes.string,
  horizontal: PropTypes.bool,
  offset: PropTypes.number,
  containerCols: PropTypes.number,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  onPress: PropTypes.func.isRequired
};

AppCard.defaultProps = {
  appName: '',
  appSummary: '',
  appIconPath: '',
  horizontal: true,
  offset: 3,
  containerCols: 3
};

export default AppCard;
