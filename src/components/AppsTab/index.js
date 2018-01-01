import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';

import AppsListContainer from '../../containers/AppsListContainer';
import styles from './styles';

export default class AppsTab extends Component {
  static navigationOptions = {
    tabBarLabel: 'APPS & GAMES'
    // tabBarIcon: ({ tintColor }) => <Icon name="recent-actors" size={22} color={tintColor} />
  };

  static propTypes = {
    fetchRepos: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchRepos();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <AppsListContainer maxCount={6} title={'Featured apps'} />
          <AppsListContainer maxCount={10} index={5} title={'Popular apps'} />
          <AppsListContainer maxCount={-3} index={9} title={'New apps'} />
        </ScrollView>
      </View>
    );
  }
}
