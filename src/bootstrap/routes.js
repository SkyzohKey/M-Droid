// @flow
import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../components/HomeScreen';
import MenuButton from '../components/MenuButton';

import sharedStyles from './sharedStyles';

export const AppRoutes = StackNavigator(
  {
    Home: { screen: HomeScreen, path: 'home' }
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
