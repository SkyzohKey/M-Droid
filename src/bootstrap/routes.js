// @flow
import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Drawer from '../components/Drawer';
import HomeScreen from '../components/HomeScreen';
import AppDetailsScreen from '../containers/AppDetailsContainer';
import ListingScreen from '../components/ListingScreen';
import SearchScreen from '../containers/SearchContainer';
import MenuButton from '../components/MenuButton';
import ReposHomeScreen from '../containers/ReposHomeContainer';
import SettingsScreen from '../components/SettingsScreen';

import sharedStyles from '../styles/sharedStyles';

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
    Home: { screen: HomeScreen, path: 'apps/home' },
    AppDetails: { screen: AppDetailsScreen, path: 'apps/app/:id/:name/:summary/:icon' },
    Search: { screen: SearchScreen, path: 'apps/search/:searchQuery' },
    Listing: { screen: ListingScreen, path: 'apps/listing/:name/:apps' }
  },
  navOptions
);

export const ReposRoutes = StackNavigator(
  {
    ReposHome: { screen: ReposHomeScreen, path: 'repos/home' }
  },
  navOptions
);

export const SettingsRoutes = StackNavigator(
  {
    SettingsHome: { screen: SettingsScreen, path: 'settings/home' }
  },
  navOptions
);

export const primaryRoutes = DrawerNavigator(
  {
    App: { screen: AppRoutes, path: 'apps' },
    Repos: { screen: ReposRoutes, path: 'repos' },
    Settings: { screen: SettingsRoutes, path: 'settings' }
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: props => <Drawer {...props} />,
    contentOptions: {
      activeTintColor: sharedStyles.ACCENT_COLOR,
      inactiveTintColor: '#222'
    }
  }
);
