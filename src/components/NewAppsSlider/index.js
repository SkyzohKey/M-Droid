import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

import AppCard from '../AppCard';
import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';
import { removeDuplicates } from '../../utils';

class NewAppsSlider extends Component {
  static propTypes = {};

  static defaultProps = {};

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

    /* if (apps === null || apps === []) {
      return null;
    }*/

    const appsUniq = removeDuplicates(apps, (item, t) => t.id === item.id).slice(0, 16);

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onLayout={() => this.onLayout()}
          data={appsUniq}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <Touchable key={item.id} onPress={() => openDetails(item)} delayPressIn={0}>
              <View style={{ height: 160 }}>
                <FastImage
                  fadeDuration={0}
                  resizeMode={FastImage.resizeMode.stretch}
                  source={{ uri: item.featureGraphic }}
                  style={[styles.appIcon, { height: 160, width: this.state.width }]}
                />
              </View>
            </Touchable>
          )}
        />
        {/* TODO: Make animated dots component */}
        {/* <View style={styles.appInfos}>
          {appsUniq.map((item, index) => {
            const isActiveStyle = {
              backgroundColor: index === 0 ? 'white' : 'rgba(255,255,255,.5)'
            };
            return <View style={[styles.dot, isActiveStyle]} />;
          })}
        </View>*/}
      </View>
    );
  }
}

export default NewAppsSlider;
