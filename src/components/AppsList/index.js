import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppCard from '../AppCard';
import Touchable from '../Touchable';
import styles from './styles';

class AppsList extends Component {
  static propTypes = {
    apps: PropTypes.array.isRequired,
    maxCount: PropTypes.number,
    index: PropTypes.number,
    title: PropTypes.string.isRequired,
    openDetails: PropTypes.func.isRequired
  };

  static defaultProps = {
    maxCount: 3,
    index: 0
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { apps, maxCount, index, title } = this.props;
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
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{title}</Text>
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
