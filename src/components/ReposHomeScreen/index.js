/**
 * TODO: REFACTOR THIS SCREEN AND CREATE A LISTROW COMPONENT
 * INSTEAD OF RE-USING THE SEARCH RESULT ROW.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ListRow from '../SearchResultRow';
import EmptyPlaceholder from '../EmptyPlaceholder';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';
import { removeDuplicates } from '../../utils';

export default class ReposHomeScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Repositories',

    drawerIcon: <Icon name={'package'} color={sharedStyles.HEADER_COLOR} size={20} />,
    headerTintColor: sharedStyles.HEADER_TEXT_COLOR,
    headerStyle: {
      backgroundColor: sharedStyles.HEADER_COLOR
    }
  });

  static propTypes = {
    repos: PropTypes.object.isRequired,
    refreshRepositories: PropTypes.func.isRequired
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
            keyExtractor={item => item.pubkey + item.name}
            renderItem={({ item }) => {
              const icon = item.url + '/icons/' + item.icon;
              return (
                <ListRow
                  appName={item.name}
                  appSummary={item.description}
                  appIcon={icon}
                  onPress={() => this.props.openDetails(item)}
                />
              );
            }}
          />
        ) : (
          <EmptyPlaceholder
            icon={'package'}
            title={'No repositories yet'}
            tagline={'Try adding a repository first by tapping the Plus button.'}
          />
        )}
      </View>
    );
  }
}
