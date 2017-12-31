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
  Platform
} from 'react-native';

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
      <Touchable {...this.props} useForeground={this.props.raised} style={{ borderRadius: 100 }}>
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
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Touchable.defaultProps = {
  ripples: true,
  ripplesColor: null,
  borderless: false,
  raised: false
};

export default Touchable;
