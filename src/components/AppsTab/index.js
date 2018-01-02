import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
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

    // TODO: Find a better way to do that.
    const internetApps = apps.filter(app => app.category === 'Internet');
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
        {reposFetched === reposCount ? (
          <ScrollView>
            <NewAppsSlider apps={newsApps} />
            <View style={styles.container}>
              <AppsList apps={internetApps} maxCount={10} title={'Internet'} icon={'web'} />
              <AppsList
                apps={navigationApps}
                maxCount={10}
                title={'Navigation'}
                icon={'navigation'}
              />
              <AppsList
                apps={securityApps}
                maxCount={10}
                title={'Security'}
                icon={'lock-outline'}
              />
              <AppsList apps={timeApps} maxCount={10} title={'Time'} icon={'calendar-clock'} />
              <AppsList
                apps={scienceApps}
                maxCount={10}
                title={'Science & Education'}
                icon={'school'}
              />
              <AppsList
                apps={themingApps}
                maxCount={10}
                title={'Theming'}
                icon={'theme-light-dark'}
              />
              <AppsList apps={graphicsApps} maxCount={10} title={'Graphics'} icon={'image'} />
              <AppsList
                apps={multimediaApps}
                maxCount={10}
                title={'Multimedia'}
                icon={'shopping-music'}
              />
              <AppsList apps={moneyApps} maxCount={10} title={'Money'} icon={'coin'} />
              <AppsList
                apps={sportsApps}
                maxCount={10}
                title={'Sports & Health'}
                icon={'car-sports'}
              />
              <AppsList apps={readingApps} maxCount={10} title={'Reading'} icon={'book-open'} />
              <AppsList apps={writingApps} maxCount={10} title={'Writing'} icon={'pen'} />
              <AppsList apps={gamesApps} maxCount={10} title={'Games'} icon={'gamepad-variant'} />
              <AppsList
                apps={connectivityApps}
                maxCount={10}
                title={'Connectivity'}
                icon={'access-point-network'}
              />
              <AppsList
                apps={devApps}
                maxCount={10}
                title={'Development'}
                icon={'android-studio'}
              />
              <AppsList apps={systemApps} maxCount={10} title={'System'} icon={'android'} />
            </View>
          </ScrollView>
        ) : (
          <View
            style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
          >
            <ActivityIndicator size={'large'} color={sharedStyles.ACCENT_COLOR} />
            <Text style={{ fontSize: 18, color: 'rgba(0,0,0,.84)', fontWeight: 'bold' }}>
              Syncing repositories
            </Text>
          </View>
        )}
      </View>
    );
  }
}
