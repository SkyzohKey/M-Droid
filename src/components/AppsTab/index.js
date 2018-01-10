import React, { Component } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-smart-splash-screen';

import AppsList from '../../containers/AppsListContainer';
import NewAppsSlider from '../../containers/NewAppsSliderContainer';
import EmptyPlaceholder from '../EmptyPlaceholder';

import { getAppsForCategory } from '../../reducers/applications/selectors';

import styles from './styles';
import sharedStyles from '../../styles/sharedStyles';

import { CATEGORIES } from './categories';
const MAX_APPS_PER_LIST = 15;
const INITIAL_APPS_TO_RENDER = 20;

class AppsTab extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { reposSynced, fetchRepos } = this.props;
    if (reposSynced === false) {
      fetchRepos();
    }
  }

  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.none,
      duration: 850,
      delay: 500
    });
  }

  render() {
    const { reposSynced } = this.props;
    if (reposSynced === false) {
      return (
        <View style={styles.container}>
          <EmptyPlaceholder
            animate={true}
            icon={'package'}
            title={'Loading apps...'}
            tagline={'This operation may take seconds.'}
          />
        </View>
      );
    }

    const { apps } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatlist}
          initialNumToRender={INITIAL_APPS_TO_RENDER}
          showsVerticalScrollIndicator={false}
          refreshControl={this.getRefreshControl()}
          data={CATEGORIES}
          keyExtractor={({ index }) => index}
          renderItem={({ item, index }) => {
            if (item.type && item.type === 'slider') {
              return <NewAppsSlider key={index} />;
            }

            const list = getAppsForCategory(apps, item.name);
            return (
              <AppsList
                key={index}
                apps={list}
                maxCount={MAX_APPS_PER_LIST}
                title={item.name}
                icon={item.icon}
              />
            );
          }}
        />
      </View>
    );
  }

  getRefreshControl() {
    const { reposSynced, fetchRepos } = this.props;
    return (
      <RefreshControl
        refreshing={reposSynced === false}
        onRefresh={() => fetchRepos()}
        title={'Pull to refresh'}
        tintColor={'#ffffff'}
        titleColor={'#000000'}
        colors={sharedStyles.LOGO_COLORS}
      />
    );
  }
}

AppsTab.navigationOptions = {
  tabBarLabel: 'APPS & GAMES'
};

AppsTab.propTypes = {
  apps: PropTypes.array.isRequired,
  reposSynced: PropTypes.bool.isRequired,
  fetchRepos: PropTypes.func.isRequired
};

export default AppsTab;
