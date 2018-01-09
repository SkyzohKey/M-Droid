import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getLocalized } from '../../utils/fdroid';

import AppCard from '../AppCard';
import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

class AppsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { apps } = this.props;
    if (apps === null || apps === [] || apps.length === 0) {
      return null;
    }

    const {
      maxCount,
      offset,
      title,
      icon,
      color,
      horizontal,
      colsCount,
      openDetails,
      openListing
    } = this.props;
    const subset = maxCount !== 0 ? apps.slice(offset, maxCount) : apps;
    const appsCount = subset.length - 1;
    return (
      <View style={styles.container}>
        {this.props.title && (
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <Icon name={icon} size={20} color={color} />
              <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <Touchable onPress={() => openListing(apps, title)} style={styles.moreButton}>
              <Text style={styles.moreText}>
                ALL <Icon name={'chevron-right'} color={'#BABABA'} />
              </Text>
            </Touchable>
          </View>
        )}
        <FlatList
          horizontal={horizontal}
          {...this.getColumnsCount()}
          initialNumToRender={colsCount + 1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={subset}
          keyExtractor={({ index }) => index}
          renderItem={({ item, index }) => (
            <AppCard
              key={index}
              isFirst={index === 0}
              isLast={index === appsCount}
              horizontal={horizontal}
              appName={getLocalized(item).name}
              appSummary={getLocalized(item).summary}
              appIconPath={item.icon}
              offset={this.getOffset(subset)}
              containerCols={colsCount}
              onPress={() => openDetails(item)}
            />
          )}
        />
      </View>
    );
  }

  getColumnsCount() {
    const { horizontal, colsCount } = this.props;
    if (horizontal === true) {
      return null;
    }

    return {
      numColumns: colsCount
    };
  }

  getOffset(apps) {
    const { colsCount } = this.props;
    if (apps.length > colsCount - 1) {
      return colsCount;
    }

    return apps.length;
  }
}

AppsList.propTypes = {
  apps: PropTypes.array.isRequired,
  maxCount: PropTypes.number,
  offset: PropTypes.number,
  colsCount: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  horizontal: PropTypes.bool,
  openDetails: PropTypes.func.isRequired,
  openListing: PropTypes.func.isRequired
};

AppsList.defaultProps = {
  horizontal: true,
  maxCount: 0,
  colsCount: 3,
  offset: 0,
  icon: 'star',
  color: sharedStyles.ACCENT_COLOR
};

export default AppsList;
