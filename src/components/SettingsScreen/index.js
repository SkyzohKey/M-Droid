/**
 * TODO: REFACTOR THIS SCREEN AND CREATE A LISTROW COMPONENT
 * INSTEAD OF RE-USING THE SEARCH RESULT ROW.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RepoListRow from '../RepoListRow';
import EmptyPlaceholder from '../EmptyPlaceholder';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';
import { removeDuplicates } from '../../utils';

export default class SettingsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Settings',
    drawerIcon: ({ tintColor }) => <Icon name={'settings'} color={tintColor} size={20} />,
    headerTintColor: sharedStyles.HEADER_TEXT_COLOR,
    headerStyle: {
      backgroundColor: sharedStyles.HEADER_COLOR
    }
  });

  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* repos.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={() => this.props.refreshRepositories()}
            refreshing={false}
            style={styles.flatlist}
            data={repos}
            keyExtractor={({ index }) => index}
            renderItem={({ item, index }) => {
              const icon = item.url + '/icons/' + item.icon;
              const isLatestRow = index == repos.length - 1;
              return (
                <RepoListRow
                  key={index}
                  name={item.name}
                  summary={item.description}
                  iconPath={icon}
                  enabled={item.enabled || false}
                  onPress={() => this.props.openDetails(item)}
                  onSwitch={() => this.props.toggleRepo(item)}
                  isLatestRow={isLatestRow}
                />
              );
            }}
          />
        ) : (*/}
        <View style={{ padding: 16, flex: 1 }}>
          <EmptyPlaceholder
            animate={true}
            animationLoop={true}
            animationFriction={0}
            animationTension={0}
            icon={'settings'}
            title={'No settings yet...'}
            tagline={'Be patient, you will enjoy customization!'}
          />
        </View>
      </View>
    );
  }
}
