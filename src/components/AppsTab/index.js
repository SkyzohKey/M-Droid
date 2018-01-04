import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import AppsList from '../../containers/AppsListContainer';
import NewAppsSlider from '../../containers/NewAppsSliderContainer';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

export default class AppsTab extends Component {
  static navigationOptions = {
    tabBarLabel: 'APPS & GAMES'
  };

  static propTypes = {
    fetchRepos: PropTypes.func.isRequired,
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

    // TODO: Find a better way to do that.
    const internetApps = apps.filter(app => app.category === 'Internet');
    const phoneSmsApps = apps.filter(app => app.category === 'Phone & SMS');
    const navigationApps = apps.filter(app => app.category === 'Navigation');
    const securityApps = apps.filter(app => app.category === 'Security');
    const timeApps = apps.filter(app => app.category === 'Time');
    const scienceApps = apps.filter(app => app.category === 'Science & Education');
    const themingApps = apps.filter(app => app.category === 'Theming');
    const graphicsApps = apps.filter(app => app.category === 'Graphics');
    const multimediaApps = apps.filter(app => app.category === 'Multimedia');
    const moneyApps = apps.filter(app => app.category === 'Money');
    const sportsApps = apps.filter(app => app.category === 'Sports & Health');
    const readingApps = apps.filter(app => app.category === 'Reading');
    const writingApps = apps.filter(app => app.category === 'Writing');
    const gamesApps = apps.filter(app => app.category === 'Games');
    const connectivityApps = apps.filter(app => app.category === 'Connectivity');
    const devApps = apps.filter(app => app.category === 'Development');
    const systemApps = apps.filter(app => app.category === 'System');
    // alert(JSON.stringify(themingApps));

    return (
      <View style={{ flex: 1 }}>
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
      </View>
    );
  }
}
