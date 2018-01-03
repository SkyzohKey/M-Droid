// @flow
import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import HomeScreen from '../components/HomeScreen';
import AppDetailsScreen from '../containers/AppDetailsContainer';
import SearchScreen from '../containers/SearchContainer';
import MenuButton from '../components/MenuButton';

import sharedStyles from './sharedStyles';

export const AppRoutes = StackNavigator(
  {
    Home: { screen: HomeScreen, path: 'home' },
    AppDetails: { screen: AppDetailsScreen, path: 'app/:id/:name/:summary/:icon' },
    Search: { screen: SearchScreen, path: 'search/:searchQuery' }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <MenuButton
          navigation={navigation}
          iconName={'menu'}
          color={sharedStyles.HEADER_COLOR}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
      )
    })
  }
);

export const primaryRoutes = DrawerNavigator({
  App: { screen: AppRoutes }
});
