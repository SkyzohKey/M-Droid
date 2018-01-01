import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation';

import MenuButton from '../../components/MenuButton';
import AppsTab from '../../containers/AppsTabContainer';
import EntertainmentTab from '../../containers/EntertainmentTabContainer';

import sharedStyles from '../../bootstrap/sharedStyles';

export const HomeTabs = TabNavigator(
  {
    Apps: { screen: AppsTab, path: 'home/apps' },
    Entertainment: { screen: EntertainmentTab, path: 'home/entertainment' }
  },
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      // inactiveBackgroundColor: MaterialColors.indigo.shade_500,
      // inactiveTintColor: MaterialColors.indigo.shade_500,
      showIcon: false,
      showLabel: true,
      inactiveTintColor: sharedStyles.TAB_INACTIVE_COLOR,
      activeTintColor: sharedStyles.TAB_ACTIVE_COLOR,
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      tabStyle: {
        padding: 8
      },
      style: {
        padding: 0,
        backgroundColor: 'white'
      },
      indicatorStyle: {
        backgroundColor: sharedStyles.ACCENT_COLOR,
        height: 3
      },
      iconStyle: {
        padding: 0,
        height: 50
      }
    }
  }
);

class HomeScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Home',
    headerTintColor: sharedStyles.HEADER_COLOR,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0 // remove shadow on Android
    },
    header: (
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
        <MenuButton
          navigation={navigation}
          iconName={'menu'}
          color={sharedStyles.HEADER_COLOR}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
        <Image
          source={require('../../assets/images/wordmarks/wordmark-muted.png')}
          style={{ flex: 1, resizeMode: 'contain', height: 40, width: 150 }}
        />
        <MenuButton
          navigation={navigation}
          iconName={'search'}
          color={sharedStyles.HEADER_COLOR}
          onPress={() => navigation.navigate('AddContact')}
        />
      </View>
    )
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <HomeTabs {...this.props} />
      </View>
    );
  }
}

HomeScreen.router = HomeTabs.router;
export default HomeScreen;
