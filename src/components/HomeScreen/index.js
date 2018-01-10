import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DeepLinkingProvider from '../DeepLinkingProvider';
import MenuButton from '../MenuButton';
import AppsTab from '../../containers/AppsTabContainer';
import EntertainmentTab from '../../containers/EntertainmentTabContainer';

import sharedStyles from '../../styles/sharedStyles';
import styles from './styles';

export const HomeTabs = TabNavigator(
  {
    Apps: { screen: AppsTab, path: 'home/apps' },
    Entertainment: { screen: EntertainmentTab, path: 'home/entertainment' }
  },
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      showIcon: false,
      showLabel: true,
      inactiveTintColor: sharedStyles.TAB_INACTIVE_COLOR,
      activeTintColor: sharedStyles.TAB_ACTIVE_COLOR,
      labelStyle: sharedStyles.tabLabel,
      tabStyle: sharedStyles.tabTab,
      style: sharedStyles.tab,
      indicatorStyle: sharedStyles.tabIndicator,
      iconStyle: sharedStyles.tabIcon
    }
  }
);

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    drawerIcon: ({ tintColor }) => <Icon name={'home'} color={tintColor} size={20} />,
    headerTintColor: sharedStyles.HEADER_COLOR,
    headerStyle: sharedStyles.header,
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
        <DeepLinkingProvider style={styles.full}>
          <HomeTabs {...this.props} />
        </DeepLinkingProvider>
      </View>
    );
  }
}

HomeScreen.router = HomeTabs.router;
export default HomeScreen;
