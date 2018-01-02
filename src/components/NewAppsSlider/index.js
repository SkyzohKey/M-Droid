import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CachedImage } from 'react-native-cached-image';

import AppCard from '../AppCard';
import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

class NewAppsSlider extends Component {
  static propTypes = {
    apps: PropTypes.array.isRequired,
    openDetails: PropTypes.func.isRequired
  };

  static defaultProps = {
    maxCount: 3,
    index: 0
  };

  constructor(props) {
    super(props);

    const { width, height } = Dimensions.get('window');
    this.state = { width, height };
  }

  onLayout() {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  }

  render() {
    const { apps, openDetails } = this.props;

    return (
      <ScrollView
        style={styles.container}
        horizontal
        pagingEnabled
        onLayout={() => this.onLayout()}
      >
        {apps.map((app, index) => {
          return (
            <Touchable key={index} onPress={() => openDetails(app)}>
              <CachedImage
                fadeDuration={0}
                source={{ uri: app.featureGraphic }}
                fallbackSource={require('../../assets/images/feature-graphic-default.jpg')}
                style={[
                  styles.appIcon,
                  { resizeMode: 'cover', height: 150, width: this.state.width }
                ]}
                activityIndicatorProps={{ size: 'large', color: sharedStyles.ACCENT_COLOR }}
              />
            </Touchable>
          );
        })}
      </ScrollView>
    );
  }
}

export default NewAppsSlider;
