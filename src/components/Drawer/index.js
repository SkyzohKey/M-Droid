import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Image
                style={styles.headerLogo}
                source={require('../../assets/images/wordmarks/wordmark-dark.png')}
              />
            </View>
            <View style={styles.versionContainer}>
              <Text style={styles.version}>v0.4.1-beta</Text>
            </View>
          </View>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
