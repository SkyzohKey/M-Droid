import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';
import { removeDuplicates } from '../../utils';

const SLIDER_HEIGHT = 160;

class NewAppsSlider extends Component {
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
    const { featuredApps, openDetails } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onLayout={() => this.onLayout()}
          data={featuredApps}
          keyExtractor={({ index }) => index}
          renderItem={({ item, index }) => (
            <Touchable key={index} onPress={() => openDetails(item)} delayPressIn={0}>
              <View style={this.getContainerStyle()}>
                <FastImage
                  fadeDuration={0}
                  resizeMode={FastImage.resizeMode.stretch}
                  source={{ uri: item.featureGraphic }}
                  style={[styles.appIcon, this.getImageStyle()]}
                />
              </View>
            </Touchable>
          )}
        />
      </View>
    );
  }

  getContainerStyle() {
    return {
      height: SLIDER_HEIGHT
    };
  }

  getImageStyle() {
    return {
      height: SLIDER_HEIGHT,
      width: this.state.width
    };
  }
}

NewAppsSlider.propTypes = {
  featuredApps: PropTypes.array.isRequired,
  openDetails: PropTypes.func.isRequired
};

export default NewAppsSlider;
