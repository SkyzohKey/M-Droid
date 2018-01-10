/**
 * TODO: REFACTOR THIS SCREEN AND CREATE A LISTROW COMPONENT
 * INSTEAD OF RE-USING THE SEARCH RESULT ROW.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

import RepoListRow from '../RepoListRow';
import ListItem from '../ListItem';
import EmptyPlaceholder from '../EmptyPlaceholder';
import styles from './styles';
import sharedStyles from '../../styles/sharedStyles';

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
              animate={true}
              animType={'shake'}
              icon={'package'}
              title={'No repositories yet...'}
              tagline={'Try adding a repository first by tapping the (+) button.'}
            />
          </View>
        </View>
      );
    }

    const { refreshRepositories, openDetails, toggleRepo } = this.props;

    return (
      <View style={[styles.container, { padding: 0 }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onRefresh={() => refreshRepositories()}
          refreshing={false}
          style={styles.flatlist}
          data={repos}
          contentContainerStyle={styles.flatlistContainer}
          keyExtractor={({ index }) => index}
          renderItem={({ item }) => {
            const icon = item.url + '/icons/' + item.icon;
            return (
              <ListItem
                key={item.url + item.name}
                icon={
                  <FastImage
                    source={{ uri: icon }}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{ width: 24, height: 24 }}
                  />
                }
                firstLine={item.name}
                isSwitchable={true}
                switchInitialValue={item.enabled || false}
                onActionPress={() => toggleRepo(item)}
                onPress={() => openDetails(item)}
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
  repos: PropTypes.array.isRequired,
  refreshRepositories: PropTypes.func.isRequired,
  toggleRepo: PropTypes.func.isRequired,
  openDetails: PropTypes.func.isRequired
};

export default ReposHomeScreen;
