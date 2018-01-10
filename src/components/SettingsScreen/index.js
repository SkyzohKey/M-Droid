/**
 * TODO: REFACTOR THIS SCREEN AND CREATE A LISTROW COMPONENT
 * INSTEAD OF RE-USING THE SEARCH RESULT ROW.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Settings } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/Entypo';

import EmptyPlaceholder from '../EmptyPlaceholder';
import ListItem from '../ListItem';
import styles from './styles';
import sharedStyles from '../../styles/sharedStyles';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ListItem
          onPress={() => {}}
          icon={<Icon name={'theme-light-dark'} size={24} />}
          firstLine={'Interface'}
          actionComponent={<Icon name={'chevron-right'} size={24} />}
        />
        <ListItem
          onPress={() => {}}
          icon={<Icon name={'update'} size={24} />}
          firstLine={'Updates'}
          actionComponent={<Icon name={'chevron-right'} size={24} />}
        />
        <ListItem
          onPress={() => {}}
          icon={<Icon name={'security-home'} size={24} />}
          firstLine={'Privacy'}
          actionComponent={<Icon name={'chevron-right'} size={24} />}
        />
        <ListItem
          onPress={() => {}}
          icon={<Icon name={'approval'} size={24} />}
          firstLine={'Apps compatibility'}
          actionComponent={<Icon name={'chevron-right'} size={24} />}
        />
        <ListItem
          onPress={() => {}}
          icon={<Icon name={'security-network'} size={24} />}
          firstLine={'Proxy'}
          actionComponent={<Icon name={'chevron-right'} size={24} />}
        />
        <ListItem
          onPress={() => {}}
          icon={<Icon name={'cached'} size={24} />}
          firstLine={'Cache & logs'}
          actionComponent={<Icon name={'chevron-right'} size={24} />}
        />
        <ListItem
          onPress={() => {}}
          icon={<EIcon name={'lab-flask'} size={24} />}
          firstLine={'Experiments Zone'}
          actionComponent={<Icon name={'chevron-right'} size={24} />}
        />
      </ScrollView>
    );
  }
}

SettingsScreen.navigationOptions = () => ({
  title: 'Settings',
  drawerIcon: ({ tintColor }) => <Icon name={'settings'} color={tintColor} size={20} />,
  headerTintColor: sharedStyles.HEADER_TEXT_COLOR,
  headerStyle: {
    backgroundColor: sharedStyles.HEADER_COLOR
  }
});

SettingsScreen.propTypes = {};

export default SettingsScreen;
