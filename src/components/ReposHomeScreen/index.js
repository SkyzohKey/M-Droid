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

class ReposHomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { repos } = this.props;
    if (repos.length <= 0) {
      return (
        <View style={styles.container}>
          <View style={sharedStyles.emptyWrapper}>
            <EmptyPlaceholder
              icon={'package'}
              title={'No repositories yet...'}
              tagline={'Try adding a repository first by tapping the Plus button.'}
            />
          </View>
        </View>
      );
    }

    const { refreshRepositories, openDetails, toggleRepo } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onRefresh={() => refreshRepositories()}
          refreshing={false}
          style={styles.flatlist}
          data={repos}
          keyExtractor={({ index }) => index}
          renderItem={({ item, index }) => {
            const icon = item.url + '/icons/' + item.icon;
            const isLatestRow = index === repos.length - 1;
            return (
              <RepoListRow
                key={index}
                name={item.name}
                summary={item.description}
                iconPath={icon}
                enabled={item.enabled || false}
                onPress={() => openDetails(item)}
                onSwitch={() => toggleRepo(item)}
                isLatestRow={isLatestRow}
              />
            );
          }}
        />
      </View>
    );
  }
}

ReposHomeScreen.navigationOptions = () => ({
  title: 'Repositories',
  // eslint-disable-next-line react/prop-types
  drawerIcon: ({ tintColor }) => <Icon name={'package'} color={tintColor} size={20} />,
  headerTintColor: sharedStyles.HEADER_TEXT_COLOR,
  headerStyle: {
    backgroundColor: sharedStyles.HEADER_COLOR
  }
});

ReposHomeScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  repos: PropTypes.object.isRequired,
  refreshRepositories: PropTypes.func.isRequired,
  toggleRepo: PropTypes.func.isRequired,
  openDetails: PropTypes.func.isRequired
};

export default ReposHomeScreen;
