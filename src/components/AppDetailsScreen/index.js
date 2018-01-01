import React, { Component } from 'react';
import { View, Text, Image, Button, Dimensions, ScrollView, Linking } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MenuButton from '../MenuButton';
import Touchable from '../Touchable';
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

    this.state = {
      descriptionExpanded: false
    };
  }

  toggleDescription() {
    this.setState({ descriptionExpanded: !this.state.descriptionExpanded });
  }

  onFeatureGraphicError() {}

  render() {
    const { app } = this.props.navigation.state.params;
    const collapseDescription =
      this.state.descriptionExpanded === false
        ? {
            height: 155
          }
        : null;

    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            width: width
          }}
        >
          <Image
            defaultSource={require('../../assets/images/feature-graphic.png')}
            source={{ uri: app.featureGraphic }}
            style={{
              height: 180,
              width: width,
              resizeMode: 'stretch'
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
          <View style={{ padding: 16 }}>
            <View style={{ overflow: 'visible' }}>
              <Image
                source={{ uri: app.icon }}
                style={{
                  width: 46,
                  height: 46,
                  resizeMode: 'contain',
                  overflow: 'visible'
                }}
                onError={() => this.onFeatureGraphicError()}
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
                <Text style={{ fontSize: 11 }}>{app.author}</Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 0.3 }}>
                <Button
                  style={{ flex: 0.3 }}
                  title="Install"
                  color={sharedStyles.ACCENT_COLOR}
                  onPress={() => Linking.openURL(app.packages[0].apkname)}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[{ padding: 16, backgroundColor: '#fafafa' }, collapseDescription]}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Touchable
              onPress={() => this.toggleDescription()}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 6
              }}
            >
              <Text style={{ color: '#BABABA', fontSize: 12, fontWeight: 'bold' }}>
                {this.state.descriptionExpanded ? 'LESS' : 'MORE'}{' '}
                <Icon
                  name={this.state.descriptionExpanded ? 'chevron-up' : 'chevron-down'}
                  color={'#BABABA'}
                />
              </Text>
            </Touchable>
          </View>
          <Text style={{ fontWeight: 'bold', color: '#696969' }}>{app.summary}</Text>
          <HTMLView
            value={app.description}
            stylesheet={{
              p: { color: '#696969' },
              a: { fontWeight: 'bold', color: sharedStyles.ACCENT_COLOR }
            }}
          />
        </View>
        <View
          style={{ marginTop: 16, height: 200, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Screenshots of {app.name}</Text>
        </View>
        <View style={{ padding: 16, backgroundColor: '#fafafa' }}>
          <Text>License: {app.license}</Text>
          <Text>Website: {app.website}</Text>
          <Text>Source: {app.source}</Text>
          <Text>Issues Tracker: {app.tracker}</Text>
          <Text>Changelog: {app.changelog}</Text>
          <Text>Flattr: {app.flattr}</Text>
          <Text>Bitcoin: {app.bitcoin}</Text>
          <Text>Litecoin: {app.litecoin}</Text>
          <Text>Liberapay: {app.liberapay}</Text>
        </View>
      </ScrollView>
    );
  }
}
