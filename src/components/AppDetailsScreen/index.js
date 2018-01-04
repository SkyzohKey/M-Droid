/**
 * TODO; REFACTOR THIS CLASS IN MULTIPLE SMALLER COMPONENTS
 * CURRENTLY THIS FILE IS A COMPLETE NIGHTMARE FOR FURTHER MAINTAINANCE.
 */

import React, { Component } from 'react';
import {
  Clipboard,
  ToastAndroid,
  View,
  Text,
  Button,
  Dimensions,
  ScrollView,
  Linking,
  Modal,
  Image
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Foundation';
import { CachedImage } from 'react-native-cached-image';

import MenuButton from '../MenuButton';
import Touchable from '../Touchable';
import AppsList from '../../containers/AppsListContainer';
import { toFileSize } from '../../utils';
import sharedStyles from '../../bootstrap/sharedStyles';
import styles from './styles';

import { downloadApp } from '../../services/RepositoryService';

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
        iconName={'search'}
        color={sharedStyles.HEADER_COLOR}
        onPress={() =>
          navigation.navigate('Search', { searchQuery: navigation.state.params.app.name })
        }
      />
    )
  });

  constructor(props) {
    super(props);

    const { width, height } = Dimensions.get('window');
    this.state = {
      descriptionExpanded: false,
      askForInstall: false,
      width,
      height
    };
  }

  toggleDescription() {
    this.setState({ descriptionExpanded: !this.state.descriptionExpanded });
  }

  onLayout() {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  }

  askForDownload() {
    this.setState({ askForInstall: true });
  }

  installApp(app) {
    if (app.packages && app.packages[0]) {
      downloadApp(app.name, app.packages[0].apkName, app.packages[0].apkUrl);
    }
    this.setState({ askForInstall: false });
  }

  copyText(text) {
    Clipboard.setString(text);
    ToastAndroid.show('Text copied to clipboard', 1000);
  }

  render() {
    const { app } = this.props.navigation.state.params;
    const { apps } = this.props;
    const collapseDescription =
      this.state.descriptionExpanded === false
        ? {
            height: app.screenshots ? 155 : 'auto'
          }
        : {
            height: 'auto'
          };

    const licenseUrl = false;

    const sameAuthorApps = apps.filter(mApp => app.author === mApp.author);
    const sameCategoryApps = apps.filter(mApp => app.category === mApp.category);

    const categories = app.categories.filter(item => item !== app.category).join(', ');

    const categoriesString =
      categories.length > 0 ? app.category + ', ' + categories : app.category;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} onLayout={() => this.onLayout()}>
          <View
            style={{
              width: this.state.width
            }}
          >
            {app.featureGraphic ? (
              <CachedImage
                fadeDuration={0}
                source={{ uri: app.featureGraphic }}
                fallbackSource={require('../../assets/images/feature-graphic-default.jpg')}
                activityIndicatorProps={{ size: 'large', color: sharedStyles.ACCENT_COLOR }}
                style={{
                  height: 180,
                  width: this.state.width,
                  resizeMode: 'stretch'
                }}
              />
            ) : null}
          </View>
          <View
            style={{
              marginTop: app.featureGraphic ? -40 : 0,
              zIndex: 2000,
              overflow: 'visible'
            }}
          >
            <View
              style={{
                padding: 16,
                borderBottomColor: '#DADADA',
                borderBottomWidth: 2,
                flexDirection: app.featureGraphic ? 'column' : 'row',
                justifyContent: app.featureGraphic ? 'flex-start' : 'center',
                alignItems: app.featureGraphic ? 'flex-start' : 'center'
              }}
            >
              <View style={{ overflow: 'visible' }}>
                <CachedImage
                  fadeDuration={0}
                  source={{ uri: app.icon }}
                  fallbackSource={require('../../assets/images/default-icon.png')}
                  activityIndicatorProps={{ size: 'large', color: sharedStyles.ACCENT_COLOR }}
                  style={{
                    width: 46,
                    height: 46,
                    resizeMode: 'contain',
                    overflow: 'visible'
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: app.featureGraphic ? 0 : 8,
                  flex: 1,
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
                  {app.author && <Text style={{ fontSize: 11 }}>{app.author}</Text>}
                </View>
                <View style={{ flexDirection: 'column', flex: 0.3 }}>
                  <Button
                    style={{ flex: 0.3 }}
                    title="Install"
                    color={sharedStyles.ACCENT_COLOR}
                    onPress={() => this.askForDownload(app)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={[{ padding: 16, backgroundColor: '#fafafa' }, collapseDescription]}>
            {app.screenshots !== undefined && (
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
            )}
            <Text selectable style={{ fontWeight: 'bold', color: '#696969' }}>
              {app.summary}
            </Text>
            <HTMLView
              selectable
              value={app.description}
              stylesheet={{
                p: { color: '#696969' },
                a: { fontWeight: 'bold', color: sharedStyles.ACCENT_COLOR }
              }}
            />
          </View>
          {app.screenshots && (
            <View
              style={{ marginTop: 16, height: 200, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Screenshots of {app.name}</Text>
            </View>
          )}
          <View>
            {app.author &&
              sameAuthorApps.length > 0 && (
                <AppsList
                  apps={sameAuthorApps}
                  title={'More from ' + app.author}
                  icon={'account-check'}
                />
              )}
            {app.category &&
              sameCategoryApps.length > 0 && (
                <AppsList
                  apps={sameCategoryApps}
                  title={'In the same category'}
                  icon={'tag-multiple'}
                />
              )}
          </View>
          <View style={{ paddingTop: 16, paddingHorizontal: 16, backgroundColor: '#fafafa' }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>ABOUT THE APP</Text>
            {app.id && (
              <Touchable onPress={() => this.copyText(app.packages[0].id)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'package'} size={20} color={'#aaa'} />
                  <Text selectable style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>{app.id}</Text>
                </View>
              </Touchable>
            )}
            {app.packages[0].added && (
              <Touchable onPress={() => this.copyText(app.packages[0].added)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'calendar'} size={20} color={'#aaa'} />
                  <Text selectable style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    Lastest update {app.packages[0].added}
                  </Text>
                </View>
              </Touchable>
            )}
            {app.packages[0].version && (
              <Touchable onPress={() => this.copyText(app.packages[0].version)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'information-outline'} size={20} color={'#aaa'} />
                  <Text selectable style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    Version {app.packages[0].version}
                  </Text>
                </View>
              </Touchable>
            )}
            {app.packages[0].size && (
              <Touchable onPress={() => {}}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'file-outline'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    {toFileSize(app.packages[0].size)}
                  </Text>
                </View>
              </Touchable>
            )}
            {app.category && (
              <Touchable onPress={() => {}}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'tag-multiple'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    {app.categories ? categoriesString : app.category}
                  </Text>
                </View>
              </Touchable>
            )}
          </View>
          <View style={{ paddingHorizontal: 16, backgroundColor: '#fafafa' }}>
            <View style={{ marginVertical: 8, height: 1.5, backgroundColor: '#ddd' }} />
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>DEVELOPER</Text>
            {app.license && (
              <Touchable
                onPress={() => {
                  if (licenseUrl !== false) {
                    Linking.openURL(licenseUrl);
                  }
                }}
              >
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'copyright'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    Licensed under {app.license}
                  </Text>
                </View>
              </Touchable>
            )}
            {app.website && (
              <Touchable onPress={() => Linking.openURL(app.website)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'web'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    Visit website
                  </Text>
                </View>
              </Touchable>
            )}
            {app.authorEmail && (
              <Touchable onPress={() => Linking.openURL('mailto:' + app.authorEmail)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'email'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    Send an email
                  </Text>
                </View>
              </Touchable>
            )}
            {app.tracker && (
              <Touchable onPress={() => Linking.openURL(app.tracker)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'bug'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    Report an issue
                  </Text>
                </View>
              </Touchable>
            )}
            {app.changelog && (
              <Touchable onPress={() => Linking.openURL(app.changelog)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'note-text'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    Changelog & release notes
                  </Text>
                </View>
              </Touchable>
            )}
            {(app.flattr || app.bitcoin || app.litecoin || app.liberapay) && (
              <View>
                <View style={{ marginVertical: 8, height: 1.5, backgroundColor: '#ddd' }} />
                <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>DONATE</Text>
              </View>
            )}
            {app.flattr && (
              <Touchable onPress={() => Linking.openURL('https://flattr.com/thing/' + app.flattr)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'flattr'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>Flattr</Text>
                </View>
              </Touchable>
            )}
            {app.bitcoin && (
              <Touchable
                onPress={() => Linking.openURL('https://blockchain.info/address/' + app.bitcoin)}
              >
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <FIcon
                    style={{ marginLeft: 3 }}
                    name={'bitcoin-circle'}
                    size={20}
                    color={'#aaa'}
                  />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>Bitcoin</Text>
                </View>
              </Touchable>
            )}
            {app.litecoin && (
              <Touchable
                onPress={() =>
                  Linking.openURL('http://explorer.litecoin.net/address/' + app.litecoin)
                }
              >
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'coin'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>Litecoin</Text>
                </View>
              </Touchable>
            )}
            {app.liberapay && (
              <Touchable onPress={() => alert('Liberapay: ' + app.liberapay)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'cash'} size={20} color={'#aaa'} />
                  <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    Liberapay
                  </Text>
                </View>
              </Touchable>
            )}
          </View>
        </ScrollView>
        <Modal
          animationType={'fade'}
          presentationStyle={'overFullscreen'}
          transparent={true}
          hardwareAccelerated={true}
          visible={!!this.state.askForInstall}
          onRequestClose={() => this.setState({ askForInstall: false })}
        >
          <View style={{ flex: 1 }} onPress={() => this.setState({ askForInstall: false })}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,.4)'
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  elevation: 6,
                  padding: 16,
                  height: 400,
                  width: this.state.width - 32 // 16px * 2
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginBottom: 8
                  }}
                >
                  <CachedImage
                    fadeDuration={0}
                    source={{ uri: app.icon }}
                    fallbackSource={require('../../assets/images/default-icon.png')}
                    activityIndicatorProps={{ size: 'large', color: sharedStyles.ACCENT_COLOR }}
                    style={{
                      width: 46,
                      height: 46,
                      resizeMode: 'contain',
                      overflow: 'visible'
                    }}
                  />
                  <Text style={{ marginLeft: 16, fontSize: 20, fontWeight: '200' }}>
                    {app.name}
                  </Text>
                </View>
                <Text style={{ fontSize: 12 }}>
                  The application request the following permissions:
                </Text>
                <ScrollView style={{ flex: 1 }}>
                  {app.packages &&
                    app.packages[0] &&
                    app.packages[0].permissions &&
                    app.packages[0].permissions.map((permission, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}
                        >
                          <Icon name={'cash'} size={20} color={'#aaa'} />
                          <Text style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                            {permission}
                          </Text>
                        </View>
                      );
                    })}
                </ScrollView>
                <View
                  style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Image
                    source={require('../../assets/images/wordmarks/wordmark-muted.png')}
                    style={{ height: 30, width: 100 }}
                    fadeDuration={0}
                  />
                  <Button
                    style={{ flex: 0.3 }}
                    title="Accept"
                    color={sharedStyles.ACCENT_COLOR}
                    onPress={() => this.installApp(app)}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
