import React, { Component } from 'react';
import { View, Text, Image, Button, Dimensions, ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';

import MenuButton from '../../components/MenuButton';
import sharedStyles from '../../bootstrap/sharedStyles';
import styles from './styles';

const { width, height } = Dimensions.get('window');

export default class AppDetailsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.app.name,
    headerTintColor: sharedStyles.HEADER_COLOR,
    headerStyle: {
      backgroundColor: 'white'
    },
    headerLeft: (
      <MenuButton
        navigation={navigation}
        iconName={'arrow-back'}
        color={sharedStyles.HEADER_COLOR}
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      <MenuButton
        navigation={navigation}
        iconName={'more-vert'}
        color={sharedStyles.HEADER_COLOR}
        onPress={() => navigation.navigate('Search')}
      />
    )
  });

  constructor(props) {
    super(props);
  }

  render() {
    const { app } = this.props.navigation.state.params;

    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            width: width
          }}
        >
          <Image
            source={{ uri: app.featureGraphic }}
            style={{
              height: 180,
              width: width,
              resizeMode: 'cover'
            }}
          />
        </View>
        <View
          style={{
            marginTop: -40,
            zIndex: 2000,
            overflow: 'visible'
          }}
        >
          <View style={{ padding: 16, elevation: 2 }}>
            <View style={{ overflow: 'visible' }}>
              <Image
                source={{ uri: app.icon }}
                style={{ width: 42, height: 42, resizeMode: 'contain', overflow: 'visible' }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <View style={{ flexDirection: 'column', flex: 0.7 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#505050' }}>
                  {app.name}
                </Text>
                <Text style={{ fontSize: 11 }}>{app.summary}</Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 0.3 }}>
                <Button
                  style={{ flex: 0.3 }}
                  title="Install"
                  color={sharedStyles.ACCENT_COLOR}
                  onPress={() => alert('Not yet implemented.')}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ padding: 16, backgroundColor: '#fafafa' }}>
          <Text style={{ fontWeight: 'bold', color: '#696969' }}>{app.summary}</Text>
          <HTMLView
            value={app.description}
            stylesheet={{
              p: { color: '#696969' },
              a: { fontWeight: 'bold', color: sharedStyles.ACCENT_COLOR }
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
