import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MenuButton from '../../components/MenuButton';
import AppsTab from '../../containers/AppsTabContainer';
import EntertainmentTab from '../../containers/EntertainmentTabContainer';

import sharedStyles from '../../bootstrap/sharedStyles';
import styles from './styles';

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
        backgroundColor: sharedStyles.HEADER_COLOR
      },
      indicatorStyle: {
        backgroundColor: sharedStyles.HEADER_TEXT_COLOR,
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
    drawerIcon: ({ tintColor }) => <Icon name={'home'} color={tintColor} size={20} />,
    headerTintColor: sharedStyles.HEADER_COLOR,
    headerStyle: {
      backgroundColor: sharedStyles.HEADER_COLOR,
      elevation: 0 // remove shadow on Android
    },
    header: (
      <View style={styles.header}>
        <MenuButton
          navigation={navigation}
          iconName={'menu'}
          color={sharedStyles.HEADER_TEXT_COLOR}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
        <Image
          source={require('../../assets/images/wordmarks/wordmark-dark.png')}
          style={styles.headerLogo}
        />
        <MenuButton
          navigation={navigation}
          iconName={'search'}
          color={sharedStyles.HEADER_TEXT_COLOR}
          onPress={() => navigation.navigate('Search', { searchQuery: '' })}
        />
      </View>
    )
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <HomeTabs {...this.props} />
      </View>
    );
  }
}

HomeScreen.router = HomeTabs.router;
export default HomeScreen;
