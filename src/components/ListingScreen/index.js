import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MenuButton from '../MenuButton';
import EmptyPlaceholder from '../EmptyPlaceholder';
import AppsList from '../../containers/AppsListContainer';
import sharedStyles from '../../bootstrap/sharedStyles';
import styles from './styles';
// import { removeDuplicates } from '../../utils';

export default class ListingScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name,
    headerTintColor: sharedStyles.HEADER_TEXT_COLOR,
    headerStyle: {
      backgroundColor: sharedStyles.HEADER_COLOR
    },
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
    <View style={{ paddingHorizontal: 32, flex: 1 }}>
      <EmptyPlaceholder
        icon={'emoticon-dead'}
        title={'Snap! No apps in this listing!'}
        tagline={'We apologize for the issue, please try another listing...'}
      />
    </View>
  );
}
