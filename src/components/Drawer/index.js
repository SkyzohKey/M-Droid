import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';

import styles from './styles';

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
              <Text style={styles.version}>{window.appVersion}</Text>
            </View>
          </View>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
