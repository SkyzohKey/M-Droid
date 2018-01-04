import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export default class EmptyPlaceholder extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    note: PropTypes.string
  };

  static defaultProps = {
    tagline: null,
    note: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { icon, title, tagline, note } = this.props;

    return (
      <View style={styles.container}>
        <Icon name={icon} size={105} color={'rgba(0,0,0,.54)'} />
        <Text style={styles.title}>{title}</Text>
        {tagline && <Text style={styles.tagline}>{tagline}</Text>}
        {note && <Text style={styles.note}>{note}</Text>}
      </View>
    );
  }
}
