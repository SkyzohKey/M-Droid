import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const ANIMATION_ROTATE = 'rotate';
const ANIMATION_TRANSLATE = 'shake';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class EmptyPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shakeValue: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const { animate } = this.props;
    if (animate) {
      this.startAnim();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animate !== nextProps.animate) {
      if (nextProps.animate) {
        this.startAnim();
      } else {
        this.stopAnim();
      }
    }
  }

  render() {
    const { icon, title, tagline, note } = this.props;
    return (
      <View style={styles.container}>
        <AnimatedIcon
          style={this.getShakeStyle()}
          name={icon}
          size={105}
          color={'rgba(0,0,0,.54)'}
        />
        <Text style={styles.title}>{title}</Text>
        {tagline && <Text style={styles.tagline}>{tagline}</Text>}
        {note && <Text style={styles.note}>{note}</Text>}
      </View>
    );
  }

  startAnim = () => {
    const { animTension, animFriction, animLoop } = this.props;
    this.state.shakeValue.setValue(0);

    const animConfig = {
      toValue: 1,
      friction: animFriction,
      tension: animTension,
      useNativeDriver: true
    };

    if (animLoop) {
      this.animation = Animated.loop(Animated.spring(this.state.shakeValue, animConfig)).start();
    } else {
      this.animation = Animated.spring(this.state.shakeValue, animConfig).start();
    }
  };

  stopAnim = () => {
    if (this.animation) {
      this.animation.stopAnimation(() => {
        this.state.shakeValue.setValue(0);
      });
    }
  };

  getShakeStyle() {
    const { animate, animType } = this.props;
    if (animate === false) {
      return null;
    }

    if (animType === ANIMATION_ROTATE) {
      return {
        transform: [
          { perspective: 1000 },
          {
            rotate: this.state.shakeValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }
        ]
      };
    } else if (animType === ANIMATION_TRANSLATE) {
      return {
        transform: [
          { perspective: 1000 },
          {
            translateX: this.state.shakeValue.interpolate({
              inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              outputRange: [0, 2, -3, 4, -4, 3, -3, 4, 5, -5, 0]
            })
          }
        ]
      };
    }

    return null;
  }
}

EmptyPlaceholder.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  note: PropTypes.string,
  animate: PropTypes.bool,
  animType: PropTypes.string,
  animFriction: PropTypes.number,
  animTension: PropTypes.number
};

EmptyPlaceholder.defaultProps = {
  tagline: null,
  note: null,
  animate: false,
  animType: ANIMATION_ROTATE,
  animFriction: 3,
  animTension: 5,
  animLoop: true
};

export default EmptyPlaceholder;
