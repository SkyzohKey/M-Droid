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

export default class ReposHomeScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Repositories',

    drawerIcon: ({ tintColor }) => <Icon name={'package'} color={tintColor} size={20} />,
    headerTintColor: sharedStyles.HEADER_TEXT_COLOR,
    headerStyle: {
      backgroundColor: sharedStyles.HEADER_COLOR
    }
  });

  static propTypes = {
    repos: PropTypes.object.isRequired,
    refreshRepositories: PropTypes.func.isRequired,
    toggleRepo: PropTypes.func.isRequired,
    openDetails: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const reposByPubkey = this.props.repos;
    const repos = removeDuplicates(
      Object.keys(reposByPubkey).map(key => reposByPubkey[key]),
      (item, t) => t.pubkey === item.pubkey && t.name === item.name
    );

    console.log(repos);

    return (
      <View style={styles.container}>
        {repos.length > 0 ? (
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
        ) : (
          <View style={{ padding: 16, flex: 1 }}>
            <EmptyPlaceholder
              icon={'package'}
              title={'No repositories yet...'}
              tagline={'Try adding a repository first by tapping the Plus button.'}
            />
          </View>
        )}
      </View>
    );
  }
}
