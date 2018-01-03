import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchInput, { createFilter } from 'react-native-search-filter';

import MenuButton from '../MenuButton';
import SearchResultRow from '../SearchResultRow';
import sharedStyles from '../../bootstrap/sharedStyles';
import styles from './styles';

const KEYS_TO_FILTERS = ['name', 'summary', 'description', 'packageName', 'author'];

export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Search',
    headerTintColor: sharedStyles.HEADER_COLOR,
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTitleStyle: styles.searchInput,
    headerTitle: (
      <SearchInput
        fuzzy={true}
        sortResults={true}
        inputViewStyles={styles.searchInput}
        placeholder={'Search app...'}
        onChangeText={term => {
          navigation.setParams({ searchQuery: term });
        }}
        /* value={navigation.state.params && navigation.state.params.searchQuery}*/
      />
    ),
    headerLeft: (
      <MenuButton
        navigation={navigation}
        iconName={'arrow-back'}
        color={sharedStyles.HEADER_COLOR}
        onPress={() => navigation.goBack()}
      />
    )
  });

  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    const { apps } = this.props;

    const searchResults =
      params.searchQuery === ''
        ? null
        : apps.filter(createFilter(params.searchQuery, KEYS_TO_FILTERS));

    return (
      <View style={styles.container}>
        {searchResults !== null
          ? this.renderResults(searchResults)
          : this.renderEmpty('Hit the search bar to find your app!')}
      </View>
    );
  }

  renderItem = ({ item }) => (
    <SearchResultRow
      elevation={2}
      appName={item.name}
      appIconPath={item.icon}
      appSummary={item.summary}
      onPress={() => this.props.openDetails(item)}
    />
  );

  renderResults = results => {
    const { params } = this.props.navigation.state;

    if (results.length <= 0) {
      return this.renderEmpty('No result for ' + params.searchQuery);
    }

    console.log(results[0]);

    return (
      <View>
        <View style={styles.row}>
          <Icon name={'search'} size={22} color={'black'} />
          <Text style={styles.resultsTitle}>
            Results for <Text style={{ fontWeight: 'bold' }}>{params.searchQuery}</Text>:
          </Text>
        </View>
        <FlatList
          style={styles.results}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.packageName}
          data={results}
          renderItem={this.renderItem}
        />
      </View>
    );
  };

  renderEmpty(message) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{message}</Text>
      </View>
    );
  }
}
