import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchInput, { createFilter } from 'react-native-search-filter';

import MenuButton from '../MenuButton';
import SearchResultRow from '../SearchResultRow';
import EmptyPlaceholder from '../EmptyPlaceholder';
import sharedStyles from '../../styles/sharedStyles';
import styles from './styles';
import { removeDuplicates } from '../../utils';

const KEYS_TO_FILTERS = ['name', 'summary', 'description', 'id', 'author'];

class SearchScreen extends Component {
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

    if (searchResults === null) {
      return (
        <View style={styles.container}>
          <View style={sharedStyles.emptyWrapper}>
            <EmptyPlaceholder
              animate={true}
              animType={'shake'}
              animLoop={false}
              icon={'regex'}
              title={'Type to search'}
              tagline={'We\'ll show you a list of results once you type something...'}
            />
          </View>
        </View>
      );
    }

    return <View style={styles.container}>{this.renderResults(searchResults)}</View>;
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
      return (
        <View style={sharedStyles.emptyWrapper}>
          <EmptyPlaceholder
            animate={true}
            animType={'shake'}
            animLoop={false}
            icon={'emoticon-dead'}
            title={'Snap! No results!'}
            tagline={'Try with a different query or use differents keywords...'}
          />
        </View>
      );
    }

    const uniqResults = removeDuplicates(
      results,
      (item, t) => t.id === item.id && t.name === item.name
    );

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.row}>
              <Icon name={'search'} size={22} color={'black'} />
              <Text style={styles.resultsTitle}>
                Results for <Text style={styles.resultHighlight}>{params.searchQuery}</Text>
              </Text>
            </View>
          )}
          style={styles.results}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
          keyExtractor={item => item.id}
          data={uniqResults}
          renderItem={this.renderItem}
        />
      </View>
    );
  };
}

SearchScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  apps: PropTypes.array.isRequired,
  openDetails: PropTypes.func.isRequired
};

SearchScreen.navigationOptions = ({ navigation }) => ({
  title: 'Search',
  headerTintColor: sharedStyles.HEADER_COLOR,
  headerStyle: {
    backgroundColor: sharedStyles.HEADER_COLOR
  },
  headerTitleStyle: styles.searchInput,
  headerTitle: (
    <View style={styles.headerWrapper}>
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
  ),
  headerRight: (
    <MenuButton
      iconName={navigation.state.params.searchQuery === '' ? 'search' : 'close'}
      color={sharedStyles.HEADER_TEXT_COLOR}
      onPress={() => navigation.setParams({ searchQuery: '' })}
    />
  )
});

export default SearchScreen;
