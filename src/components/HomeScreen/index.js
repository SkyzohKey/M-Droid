import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, ScrollView, Text } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'M-Droid'
  };

  static propTypes = {
    reposByPubkey: PropTypes.object.isRequired,
    defaultRepositories: PropTypes.array.isRequired,
    reposFetched: PropTypes.number.isRequired,
    reposCount: PropTypes.number.isRequired,
    onTestPress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { reposByPubkey, reposFetched, reposCount, onTestPress } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Button
          style={{ margin: 8 }}
          title="Fetch these motha fucka repos!"
          onPress={() => onTestPress()}
        />
        <View style={{ padding: 8 }}>
          <Text>
            Fetched {reposFetched} repos over {reposCount}.
          </Text>
        </View>
        <ScrollView style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
          {Object.keys(reposByPubkey).map((pubkey, index) => {
            const repo = reposByPubkey[pubkey];
            return (
              <View key={index} style={{ marginVertical: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {repo.name}{' '}
                  <Text style={{ fontSize: 10 }}>({repo.applications.length} apps)</Text>
                </Text>
                <Text style={{ fontSize: 12 }}>{repo.description}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
