// @flow
import React from 'react';
import { Image } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import HomeScreen from '../components/HomeScreen';
import AppDetailsScreen from '../containers/AppDetailsContainer';
import SearchScreen from '../containers/SearchContainer';
import MenuButton from '../components/MenuButton';
import ReposHomeScreen from '../containers/ReposHomeContainer';

import sharedStyles from './sharedStyles';

const navOptions = {
  navigationOptions: ({ navigation }) => ({
    headerLeft: (
      <MenuButton
        navigation={navigation}
        iconName={'menu'}
        color={sharedStyles.HEADER_TEXT_COLOR}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    )
  })
};

export const AppRoutes = StackNavigator(
  {
    Home: { screen: HomeScreen, path: 'repos/home' },
    AppDetails: { screen: AppDetailsScreen, path: 'repos/app/:id/:name/:summary/:icon' },
    Search: { screen: SearchScreen, path: 'repos/search/:searchQuery' }
  },
  navOptions
);

export const ReposRoutes = StackNavigator(
  {
    ReposHome: { screen: ReposHomeScreen, path: 'repos/home' }
  },
  navOptions
);

export const primaryRoutes = DrawerNavigator({
  App: { screen: AppRoutes, path: 'apps' },
  Repos: { screen: ReposRoutes, path: 'repos' }
});
