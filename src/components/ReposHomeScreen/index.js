import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ListRow from '../SearchResultRow';
import styles from './styles';
import sharedStyles from '../../bootstrap/sharedStyles';

export default class ReposHomeScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Repositories',
    drawerIcon: ({ tintColor }) => <Icon name={'package'} color={tintColor} size={20} />,
    headerTintColor: sharedStyles.HEADER_COLOR,
    headerStyle: {
      backgroundColor: 'white'
    }
  });

  static propTypes = {
    repos: PropTypes.object.isRequired,
    refreshRepositories: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  removeDuplicates = items => {
    const newItem = items.filter(
      (item, index, self) =>
        index === self.findIndex(t => t.pubkey === item.pubkey && t.name === item.name)
    );

    return newItem;
  };

  render() {
    const reposByPubkey = this.props.repos;
    const repos = this.removeDuplicates(Object.keys(reposByPubkey).map(key => reposByPubkey[key]));

    console.log(repos);

    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}
