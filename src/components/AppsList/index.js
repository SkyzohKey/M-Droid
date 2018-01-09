import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppCard from '../AppCard';
import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';
import { removeDuplicates } from '../../utils';

class AppsList extends Component {
  static propTypes = {
    apps: PropTypes.array.isRequired,
    maxCount: PropTypes.number,
    offset: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    horizontal: PropTypes.bool,
    openDetails: PropTypes.func.isRequired,
    openListing: PropTypes.func.isRequired
  };

  static defaultProps = {
    horizontal: true,
    maxCount: 0,
    offset: 0,
    icon: 'star',
    color: sharedStyles.ACCENT_COLOR
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { apps, maxCount, offset, title, icon, color } = this.props;
    if (apps === null || apps === [] || apps.length === 0) {
      return null;
    }

    // Don't want blank name on the screen.
    let subset = apps.filter(app => {
      const kName =
        app.localized && app.localized['en-US'] ? app.localized['en-US'].name : app.name;

      return kName !== null && String(kName).trim() !== '';
    });

    if (maxCount !== 0) {
      subset = apps.slice(offset, maxCount);
    }

    const uniqApps = removeDuplicates(
      subset,
      (item, t) => t.id === item.id && t.name === item.name
    );

    const appsCount = uniqApps.length - 1;

    const numCols = this.props.horizontal
      ? null
      : {
          numColumns: 3
        };

    return (
      <View style={styles.container}>
        {this.props.title && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 12
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
              <Icon name={icon} size={20} color={color} />
              <Text style={{ marginLeft: 8, color: 'black', fontWeight: 'bold' }}>{title}</Text>
            </View>
            <Touchable
              onPress={() => this.props.openListing(apps, title)}
              style={{ paddingHorizontal: 8, paddingVertical: 6 }}
            >
              <Text style={{ color: '#BABABA', fontSize: 12, fontWeight: 'bold' }}>
                ALL <Icon name={'chevron-right'} color={'#BABABA'} />
              </Text>
            </Touchable>
          </View>
        )}
        <FlatList
          horizontal={this.props.horizontal}
          {...numCols}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={uniqApps}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item, index }) => {
            // To deal with i18n
            const description =
              item.localized && item.localized['en-US']
                ? item.localized['en-US'].description
                : item.description;
            const summary =
              item.localized && item.localized['en-US']
                ? item.localized['en-US'].summary
                : item.summary;
            const name =
              item.localized && item.localized['en-US'] ? item.localized['en-US'].name : item.name;

            return (
              <AppCard
                key={index}
                isFirst={index === 0}
                isLast={index === appsCount}
                horizontal={this.props.horizontal}
                appName={name || item.name}
                appSummary={summary || item.summary}
                appIconPath={item.icon}
                offset={uniqApps.length > 2 ? 3 : uniqApps.length}
                onPress={() => {
                  this.props.openDetails(item);
                }}
              />
            );
          }}
        />
      </View>
    );
  }
}

export default AppsList;
