import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import Touchable from '../Touchable';

class MenuButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Touchable
          onPress={() => {
            if (this.props.onPress) {
              this.props.onPress();
            }
          }}
          borderless={true}
          delayPressIn={0}
        >
          <View style={styles.wrapper}>
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
                style={styles.image}
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

MenuButton.propTypes = {
  iconName: PropTypes.string,
  image: PropTypes.any,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default MenuButton;
