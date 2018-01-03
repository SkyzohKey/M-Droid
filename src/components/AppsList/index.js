import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppCard from '../AppCard';
import Touchable from '../Touchable';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

class AppsList extends Component {
  static propTypes = {
    apps: PropTypes.array.isRequired,
    maxCount: PropTypes.number,
    offset: PropTypes.number,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    color: PropTypes.string,
    openDetails: PropTypes.func.isRequired
  };

  static defaultProps = {
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

    let subset = apps;
    if (maxCount !== 0) {
      subset = apps.slice(offset, maxCount);
    }

    return (
      <View style={styles.container}>
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
            <Text style={{ color: '#BABABA', fontSize: 12, fontWeight: 'bold' }}>
              ALL <Icon name={'chevron-right'} color={'#BABABA'} />
            </Text>
          </Touchable>
        </View>
        <FlatList
          horizontal={true}
          // pagingEnabled={true}
          // numColumns={3} // Useful to make grids!
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={subset}
          renderItem={({ item, index }) =>
            item.name === null ? null : (
              <AppCard
                style={{ marginRight: index <= subset.length - 1 ? 8 : 0 }}
                key={item.id}
                appName={item.name}
                appSummary={item.summary}
                appIconPath={item.icon}
                onPress={() => {
                  this.props.openDetails(item);
                }}
              />
            )
          }
        />
      </View>
    );
  }
}

export default AppsList;
