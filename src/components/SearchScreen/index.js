import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchInput, { createFilter } from 'react-native-search-filter';

import MenuButton from '../MenuButton';
import SearchResultRow from '../SearchResultRow';
import sharedStyles from '../../bootstrap/sharedStyles';
import styles from './styles';
import { removeDuplicates } from '../../utils';

const KEYS_TO_FILTERS = ['name', 'summary', 'description', 'id', 'author'];

export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Search',
    headerTintColor: sharedStyles.HEADER_COLOR,
    headerStyle: {
      backgroundColor: sharedStyles.HEADER_COLOR
    },
    headerTitleStyle: styles.searchInput,
    headerTitle: (
      <View
        style={{
          elevation: 1,
          margin: 2,
          flex: 1,
          width: '100%',
          justifyContent: 'center'
        }}
      >
        <SearchInput
          autoFocus={true}
          fuzzy={true}
          sortResults={true}
          inputViewStyles={styles.searchInput}
          style={styles.searchInputText}
          placeholder={'Search app...'}
          placeholderTextColor={sharedStyles.HEADER_TEXT_COLOR}
          onChangeText={term => {
            navigation.setParams({ searchQuery: term });
          }}
          value={navigation.state.params.searchQuery && navigation.state.params.searchQuery}
        />
      </View>
    ),
    headerLeft: (
      <MenuButton
        navigation={navigation}
        iconName={'arrow-back'}
        color={sharedStyles.HEADER_TEXT_COLOR}
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
          : this.renderEmpty('search', 'Hit the search bar to find your app!')}
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
      return this.renderEmpty('error-outline', 'No result for ' + params.searchQuery);
    }

    const uniqResults = removeDuplicates(
      results,
      (item, t) => t.id === item.id && t.name === item.name
    );

    return (
      <View>
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.row}>
              <Icon name={'search'} size={22} color={'black'} />
              <Text style={styles.resultsTitle}>
                Results for{' '}
                <Text style={{ fontWeight: 'bold', color: sharedStyles.ACCENT_COLOR }}>
                  {params.searchQuery}
                </Text>
              </Text>
            </View>
          )}
          style={styles.results}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.packageName}
          data={uniqResults}
          renderItem={this.renderItem}
        />
      </View>
    );
  };

  renderEmpty(icon, message) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={icon} size={48} color={'#BABABA'} />
        <Text style={{ marginTop: 16, fontSize: 20, textAlign: 'center', color: '#BABABA' }}>
          {message}
        </Text>
      </View>
    );
  }
}
