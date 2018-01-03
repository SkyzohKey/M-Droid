// @flow
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  BackgroundPropType,
  Platform,
  InteractionManager
} from 'react-native';

import sharedStyles from '../../bootstrap/sharedStyles';

class Touchable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Touchable = Platform.select({
      ios: TouchableHighlight,
      android: this.props.ripples ? TouchableNativeFeedback : TouchableWithoutFeedback,
      windows: TouchableHighlight
    });

    const ripplesColor = () => {
      if (this.props.ripplesColor != null) {
        return TouchableNativeFeedback.Ripple(this.props.ripplesColor, this.props.borderless);
      }

      return null;
    };

    return (
      <Touchable
        {...this.props}
        onPress={() => {
          if (this.props.onPress) {
            InteractionManager.runAfterInteractions(this.props.onPress());
          }
        }}
        useForeground={this.props.raised}
        background={ripplesColor()}
        style={{ borderRadius: 100 }}
      >
        <View style={this.props.style}>{Children.only(this.props.children)}</View>
      </Touchable>
    );
  }
}

Touchable.propTypes = {
  ripples: PropTypes.bool,
  ripplesColor: PropTypes.string,
  borderless: PropTypes.bool,
  raised: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func.isRequired
};

Touchable.defaultProps = {
  ripples: true,
  ripplesColor: sharedStyles.RIPPLES_COLOR_DEFAULT,
  borderless: false,
  raised: false,
  onPress: () => {}
};

export default Touchable;
