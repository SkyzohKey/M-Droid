import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';

import AppCard from '../AppCard';

import styles from './styles';

export default class AppsList extends Component {
  static propTypes = {
    apps: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { apps } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={{ marginBottom: 8, color: 'black', fontWeight: 'bold' }}>Featured Apps</Text>
          <Text style={{ color: '#BABABA', fontSize: 12 }}>ALL &gt;</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} horizontal style={{ flex: 0 }}>
          {apps.map((app, index) => {
            if (app.name == null) {
              return null;
            }
            return (
              <AppCard
                style={{ marginRight: 8 }}
                key={index}
                appName={app.name}
                appIconPath={app.icon}
                onPress={() => {
                  alert(app.name + ' clicked!');
                }}
              />
            );
          })}
        </ScrollView>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={{ marginBottom: 8, marginTop: 8, color: 'black', fontWeight: 'bold' }}>
            Featured Apps
          </Text>
          <Text style={{ color: '#BABABA', fontSize: 12 }}>ALL &gt;</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} horizontal style={{ flex: 0 }}>
          {apps.map((app, index) => {
            if (app.name == null) {
              return null;
            }
            return (
              <AppCard
                style={{ marginRight: 8 }}
                key={index}
                appName={app.name}
                appIconPath={app.icon}
                onPress={() => {
                  alert(app.name + ' clicked!');
                }}
              />
            );
          })}
        </ScrollView>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={{ marginBottom: 8, marginTop: 8, color: 'black', fontWeight: 'bold' }}>
            Featured Apps
          </Text>
          <Text style={{ color: '#BABABA', fontSize: 12 }}>ALL &gt;</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} horizontal style={{ flex: 0 }}>
          {apps.map((app, index) => {
            if (app.name == null) {
              return null;
            }
            return (
              <AppCard
                style={{ marginRight: 8 }}
                key={index}
                appName={app.name}
                appIconPath={app.icon}
                onPress={() => {
                  alert(app.name + ' clicked!');
                }}
              />
            );
          })}
        </ScrollView>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={{ marginBottom: 8, marginTop: 8, color: 'black', fontWeight: 'bold' }}>
            Featured Apps
          </Text>
          <Text style={{ color: '#BABABA', fontSize: 12 }}>ALL &gt;</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal
          style={{ flex: 0, marginBottom: 8 }}
        >
          {apps.map((app, index) => {
            if (app.name == null) {
              return null;
            }
            return (
              <AppCard
                style={{ marginRight: 8 }}
                key={index}
                appName={app.name}
                appIconPath={app.icon}
                onPress={() => {
                  alert(app.name + ' clicked!');
                }}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    );
  }
}
