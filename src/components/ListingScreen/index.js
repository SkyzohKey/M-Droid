import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import MenuButton from '../MenuButton';
import EmptyPlaceholder from '../EmptyPlaceholder';
import AppsList from '../../containers/AppsListContainer';
import sharedStyles from '../../bootstrap/sharedStyles';
import styles from './styles';

class ListingScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    const { apps } = params;
    if (apps.length <= 0) {
      this.renderNoListing();
    }

    return (
      <View style={styles.container}>
        <AppsList apps={apps} horizontal={false} />
      </View>
    );
  }

  renderNoListing = () => (
    <View style={sharedStyles.emptyWrapper}>
      <EmptyPlaceholder
        icon={'emoticon-dead'}
        title={'Snap! No apps in this listing!'}
        tagline={'We apologize for the issue, please try another listing...'}
      />
    </View>
  );
}

ListingScreen.navigationOptions = ({ navigation, screenProps }) => ({
  title: navigation.state.params.name,
  headerTintColor: sharedStyles.HEADER_TEXT_COLOR,
  headerStyle: sharedStyles.header,
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
      navigation={navigation}
      iconName={'search'}
      color={sharedStyles.HEADER_TEXT_COLOR}
      onPress={() => navigation.navigate('Search', { searchQuery: '' })}
    />
  )
});

ListingScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};

export default ListingScreen;
