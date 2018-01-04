import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import AppsList from '../../containers/AppsListContainer';
import NewAppsSlider from '../../containers/NewAppsSliderContainer';
import EmptyPlaceholder from '../EmptyPlaceholder';
import styles from './styles';

export default class AppsTab extends Component {
  static navigationOptions = {
    tabBarLabel: 'APPS & GAMES'
  };

  static propTypes = {
    fetchRepos: PropTypes.func.isRequired,
    reposFetched: PropTypes.number.isRequired,
    reposCount: PropTypes.number.isRequired,
    apps: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchRepos();
  }

  render() {
    const { apps, reposFetched, reposCount } = this.props;
    const newsApps = apps.filter(app => app.featureGraphic !== null).slice(0, 5);

    const categories = [
      { name: 'Internet', icon: 'web' },
      { name: 'Phone & SMS', icon: 'phone' },
      { name: 'Navigation', icon: 'navigation' },
      { name: 'Security', icon: 'lock-outline' },
      { name: 'Time', icon: 'calendar-clock' },
      { name: 'Science & Education', icon: 'school' },
      { name: 'Theming', icon: 'theme-light-dark' },
      { name: 'Graphics', icon: 'image' },
      { name: 'Multimedia', icon: 'shopping-music' },
      { name: 'Money', icon: 'coin' },
      { name: 'Sports & Health', icon: 'car-sports' },
      { name: 'Reading', icon: 'book-open' },
      { name: 'Writing', icon: 'pen' },
      { name: 'Games', icon: 'gamepad-variant' },
      { name: 'Connectivity', icon: 'access-point-network' },
      { name: 'Development', icon: 'android-studio' },
      { name: 'System', icon: 'android' }
    ];

    return (
      <View style={styles.container}>
        {reposFetched === reposCount && reposCount > 0 ? (
          <FlatList
            style={{ flex: 1 }}
            data={categories}
            keyExtractor={item => item.name}
            renderItem={({ item }) => {
              const sApps = apps.filter(app => app.category === item.name);
              return <AppsList apps={sApps} maxCount={24} title={item.name} icon={item.icon} />;
            }}
            ListHeaderComponent={<NewAppsSlider apps={newsApps} />}
          />
        ) : (
          <EmptyPlaceholder
            icon={'package'}
            title={'Loading packages...'}
            tagline={'This operation may take seconds.'}
          />
        )}
      </View>
    );
  }
}
