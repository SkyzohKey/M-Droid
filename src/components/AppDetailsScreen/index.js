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
  Image,
  Dimensions,
  ScrollView,
  Linking,
  Modal,
  FlatList,
  ProgressBarAndroid,
  Animated
} from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Foundation';
import FastImage from 'react-native-fast-image';
import ApkUtils from 'react-native-apk';
import RNFetchBlob from 'react-native-fetch-blob';

import EmptyPlaceholder from '../EmptyPlaceholder';
import MenuButton from '../MenuButton';
import Touchable from '../Touchable';
import AppsList from '../../containers/AppsListContainer';
import { toFileSize, unixToDate } from '../../utils';
import sharedStyles from '../../styles/sharedStyles';
import styles from './styles';

// import { downloadApp } from '../../services/RepositoryService';

class AppDetailsScreen extends Component {
  constructor(props) {
    super(props);

    const { width, height } = Dimensions.get('window');
    this.state = {
      descriptionExpanded: false, // SET THIS BACK TO FALSE AFTER UI STYLING !
      askForInstall: false, // SET THIS BACK TO FALSE AFTER UI STYLING !
      width,
      height,
      appInstalled: false, // SET THIS BACK TO FALSE AFTER UI STYLING !
      progressRunning: false, // SET THIS BACK TO FALSE AFTER UI STYLING !
      received: 0,
      total: 0,
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
    if (!app) {
      return;
    }

    if (app.packages && app.packages[0]) {
      this.downloadTask = RNFetchBlob.config({
        path: RNFetchBlob.fs.dirs.DownloadDir + app.packages[0].apkName,
        mime: 'application/vnd.android.package-archive'
        /* addAndroidDownloads: {
          useDownloadManager: true,
          title: app.packages[0].apkName,
          description:
            'Downloading & installing « ' + app.name || app.localized['en-US'].name + ' ».',
          mime: 'application/vnd.android.package-archive',
          mediaScannable: true
          notification: true
        }*/
      }).fetch('GET', app.packages[0].apkUrl);

      this.downloadTask
        .progress({ interval: 1000 }, (received, total) => {
          this.setState({ progressRunning: true, received: received, total: total });
          // console.log('Received ' + received + ' over ' + total + '.');
        })
        .then(res => {
          if (this.state.progressRunning) {
            RNFetchBlob.android.actionViewIntent(
              res.path(),
              'application/vnd.android.package-archive'
            );
          }
          this.setState({ progressRunning: false, received: 0, total: 0 });
        });
    }
    this.setState({ askForInstall: false });
  }

  cancelDownload() {
    if (this.downloadTask) {
      this.downloadTask.cancel(err => {
        if (err === null) {
          this.setState({ progressRunning: false, received: 0, total: 0 });
        }
      });
    }
  }

  copyText(text) {
    Clipboard.setString(text);
    ToastAndroid.show('Text copied to clipboard', 1000);
  }

  handleScroll(event) {
    this.offsetY = event.nativeEvent.contentOffset.y;
    if (this.offsetY < 140) {
      this.props.navigation.setParams({ translucent: false });
    } else {
      this.props.navigation.setParams({ translucent: true });
    }
  }

  render() {
    if (!this.props.navigation.state.params.app) {
      return (
        <EmptyPlaceholder
          icon={'package'}
          title={'Snap, no app!'}
          tagline={'Try adding the app\'s repository or try to search for it...'}
        />
      );
    }

    const { apps } = this.props;
    const app = this.props.navigation.state.params.app;

    ApkUtils.isAppInstalled(app.id, installed => {
      this.setState({ appInstalled: installed });
    });

    const installApp = () => this.askForDownload(app);
    const runApp = () => ApkUtils.runApp(app.id);
    const uninstallApp = () => {
      ApkUtils.uninstallApp(app.id, () => {
        ApkUtils.isAppInstalled(app.id, installed => {
          this.setState({ appInstalled: installed });
        });
      });
    };

    /* ApkUtils.getNonSystemApps((apps) => {
      console.log(apps);
    })*/

    // To deal with i18n
    let description = '';
    let name = '';
    let summary = '';
    if (app.localized && app.localized['en-US']) {
      description = app.localized['en-US'].description;
      summary = app.localized['en-US'].summary;
      name = app.localized['en-US'].name;
    } else {
      description = app.description;
      summary = app.summary;
      name = app.name;
    }

    const collapseDescription =
      this.state.descriptionExpanded === false
        ? {
            height: app.screenshots !== null ? 80 : 'auto'
          }
        : {
            height: 'auto'
          };

    const licenseUrl = false;

    const sameAuthorApps = apps.filter(
      mApp =>
        (app.author === mApp.author ||
          (app.id &&
            app.id.split('.').length >= 0 &&
            app.id.split('.')[1] === mApp.id.split('.')[1])) &&
        app.id !== mApp.id
    );
    const sameCategoryApps = apps.filter(
      mApp => app.category === mApp.category && app.id !== mApp.id
    );

    const categories = app.categories.filter(item => item !== app.category).join(', ');

    const categoriesString =
      categories.length > 0 ? app.category + ', ' + categories : app.category;

    return (
      <View style={{ flex: 1, marginTop: app.featureGraphic ? -60 : 0 }}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={event => this.handleScroll(event)}
          onLayout={() => this.onLayout()}
        >
          <View
            style={{
              width: this.state.width
            }}
          >
            {app.featureGraphic ? (
              <FastImage
                source={{ uri: app.featureGraphic }}
                resizeMode={FastImage.resizeMode.stretch}
                style={{
                  height: 180,
                  width: this.state.width
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
                <FastImage
                  source={{ uri: app.icon }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: 46,
                    height: 46,
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
                  alignItems: app.featureGraphic ? 'flex-start' : 'center'
                }}
              >
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#505050' }}>
                    {name || app.name || app.localized[0].name}
                  </Text>
                  {app.author ? (
                    <Text style={{ fontSize: 11 }}>{app.author}</Text>
                  ) : (
                    <Text style={{ fontSize: 11 }}>{String(app.id).split('.')[1]}</Text>
                  )}
                </View>
                <View>
                  {this.state.appInstalled === false &&
                    this.state.progressRunning === false && (
                      <View style={{ flexDirection: 'column', marginBottom: 5 }}>
                        <View style={{ marginBottom: 5 }}>
                          <Button
                            style={{ flex: 1 }}
                            title="Install"
                            color={sharedStyles.ACCENT_COLOR}
                            onPress={() => installApp()}
                          />
                        </View>
                      </View>
                    )}
                  {this.state.appInstalled &&
                    this.state.progressRunning == false && (
                      <View
                        style={{
                          backgroundColor: 'white',
                          flexDirection: 'row',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <View style={{ marginRight: 8, marginBottom: 5 }}>
                          <Button title="Uninstall" color={'#666'} onPress={() => uninstallApp()} />
                        </View>
                        <View style={{ marginBottom: 5 }}>
                          <Button
                            title="Launch"
                            color={sharedStyles.ACCENT_COLOR}
                            onPress={() => runApp()}
                          />
                        </View>
                      </View>
                    )}
                  {this.state.progressRunning && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: 150
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          width: 150,
                          marginRight: 8
                        }}
                      >
                        <ProgressBarAndroid
                          progress={this.state.received / this.state.total}
                          color={sharedStyles.ACCENT_COLOR}
                          styleAttr={'Horizontal'}
                          style={{ width: 150 }}
                          indeterminate={false}
                        />
                        <Text style={{ fontWeight: 'bold', color: '#CACACA' }}>
                          {toFileSize(this.state.received)} / {toFileSize(this.state.total)}
                        </Text>
                      </View>
                      <Touchable
                        delayPressIn={0}
                        borderless={true}
                        onPress={() => this.cancelDownload()}
                      >
                        <View style={{ padding: 8, borderRadius: 8 }}>
                          <Icon name={'close'} size={24} color={'#CACACA'} />
                        </View>
                      </Touchable>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={[{ padding: 16, backgroundColor: '#fafafa' }]}>
            {app.screenshots !== null && (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Touchable
                  onPress={() => this.toggleDescription()}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8
                  }}
                >
                  <Text
                    style={{
                      color: '#BABABA',
                      fontSize: 12,
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
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
              {summary || app.summary || app.localized[0].summary}
            </Text>
            <View style={[{ backgroundColor: '#FAFAFA', paddingVertical: 8 }, collapseDescription]}>
              <HTMLView
                selectable
                value={description || app.description || app.localized[0].description}
                stylesheet={{
                  p: { color: '#696969' },
                  a: { fontWeight: 'bold', color: sharedStyles.ACCENT_COLOR }
                }}
              />
            </View>
          </View>
          {app.screenshots && (
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.05)',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={app.screenshots}
                keyExtractor={({ item, index }) => index}
                renderItem={({ item, index }) => {
                  const isFirstImage = index === 0;
                  const isLastImage = index === app.screenshots.length - 1;
                  const paddingStyle = {
                    paddingRight: isLastImage ? 16 : 4,
                    paddingLeft: isFirstImage ? 16 : 4,
                    paddingVertical: 16
                  };

                  return (
                    <View key={index} style={paddingStyle}>
                      <FastImage
                        fadeDuration={0}
                        source={{ uri: item }}
                        activityIndicatorProps={{ size: 'large', color: sharedStyles.ACCENT_COLOR }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                          width: 150,
                          height: 260
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
          )}
          <View>
            {app.author &&
              sameAuthorApps.length > 0 && (
                <AppsList
                  apps={sameAuthorApps}
                  title={'More from ' + (app.author || String(app.id).split('.')[1])}
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
              <Touchable onPress={() => this.copyText(app.id)}>
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'package'} size={20} color={'#aaa'} />
                  <Text selectable style={{ marginLeft: 8, color: '#666', fontWeight: 'bold' }}>
                    {app.id}
                  </Text>
                </View>
              </Touchable>
            )}
            {app.packages[0].added && (
              <Touchable
                onPress={() => this.copyText('Last update ' + unixToDate(app.packages[0].added))}
              >
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
                    Last update {unixToDate(app.packages[0].added)}
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
          <View style={{ paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#fafafa' }}>
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
          // presentationStyle={'overFullscreen'}
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
                  <FastImage
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
                            {permission.replace('android.permission.', '')}
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

AppDetailsScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};

AppDetailsScreen.navigationOptions = ({ navigation }) => ({
  headerTintColor: sharedStyles.HEADER_TEXT_COLOR,
  headerStyle: {
    backgroundColor:
      navigation.state.params.app.featureGraphic && !navigation.state.params.translucent
        ? 'rgba(0,0,0,0.01)'
        : sharedStyles.HEADER_COLOR,
    elevation:
      navigation.state.params.app.featureGraphic && !navigation.state.params.translucent ? 0 : 6,
  },
  headerLeft: (
    <MenuButton
      navigation={navigation}
      iconName={'arrow-back'}
      color={sharedStyles.HEADER_TEXT_COLOR}
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <MenuButton
      navigation={navigation}
      iconName={'search'}
      color={sharedStyles.HEADER_TEXT_COLOR}
      onPress={() =>
        navigation.navigate('Search', { searchQuery: navigation.state.params.app.name || '' })
      }
    />
  )
});

export default AppDetailsScreen;
