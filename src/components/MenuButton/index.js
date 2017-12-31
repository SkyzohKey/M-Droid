import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from '../Touchable';

export default class MenuButton extends Component {
  render() {
    return (
      <View>
        <Touchable
          onPress={() => {
            this.props.onPress && this.props.onPress();
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50
            }}
          >
            {this.props.iconName && (
              <Icon
                style={{}}
                name={this.props.iconName ? this.props.iconName : 'menu'}
                color={this.props.color ? this.props.color : 'black'}
                size={24}
              />
            )}
            {this.props.image && (
              <Image
                style={{
                  width: 30,
                  height: 30,
                  margin: 8,
                  borderRadius: 30
                }}
                source={
                  typeof this.props.image === 'string'
                    ? { uri: this.props.image }
                    : this.props.image
                }
              />
            )}
          </View>
        </Touchable>
      </View>
    );
  }
}
