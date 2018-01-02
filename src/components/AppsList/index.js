import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppCard from '../AppCard';
import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

class AppsList extends Component {
  static propTypes = {
    apps: PropTypes.array.isRequired,
    maxCount: PropTypes.number,
    index: PropTypes.number,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    color: PropTypes.string,
    openDetails: PropTypes.func.isRequired
  };

  static defaultProps = {
    maxCount: 3,
    index: 0,
    icon: 'star',
    color: sharedStyles.ACCENT_COLOR
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { apps, maxCount, index, title, icon, color } = this.props;
    if (apps === null || apps === [] || apps.length === 0) {
      return null;
    }

    let subset;
    if (maxCount !== 0) {
      subset = apps.slice(index, maxCount);
    }

    return (
      <ScrollView style={styles.container}>
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
            onPress={() => alert('Show more ' + title + '.')}
            style={{ paddingHorizontal: 8, paddingVertical: 6 }}
          >
            <Text style={{ color: '#BABABA', fontSize: 12 }}>
              ALL <Icon name={'chevron-right'} color={'#BABABA'} />
            </Text>
          </Touchable>
        </View>
        <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flex: 0 }}
        >
          {subset.map((app, index) => {
            // TODO: Handle the case were app does not have an icon.
            if (app.name == null) {
              // Do not display apps without name...
              return null;
            }
            return (
              <AppCard
                style={{ marginRight: 8 }}
                key={index}
                appName={app.name}
                appSummary={app.summary}
                appIconPath={app.icon}
                onPress={() => {
                  this.props.openDetails(app);
                }}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    );
  }
}

export default AppsList;
