import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Touchable from '../Touchable';

import styles from './styles';
import sharedStyles from '../../styles/sharedStyles';

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.icon === nextProps.icon &&
      this.props.firstLine === nextProps.firstLine &&
      this.props.secondLine === nextProps.secondLine &&
      this.props.actionComponent === nextProps.actionComponent &&
      this.props.contentComponent === nextProps.contentComponent &&
      this.props.isSwitchable === nextProps.isSwitchable &&
      this.props.switchInitialValue === nextProps.switchInitialValue &&
      this.props.onPress === nextProps.onPress &&
      this.props.onActionPress === nextProps.onActionPress
    ) {
      return false;
    }

    return true;
  }

  render() {
    const ContainerComponent = props => this.getContainer(props);
    const IconComponent = this.getIcon();
    const ContentComponent = this.getContent();
    const ActionComponent = props => this.getAction(props);

    return (
      <ContainerComponent>
        <IconComponent />
        <ContentComponent />
        <ActionComponent />
      </ContainerComponent>
    );
  }

  getContainer = props => {
    const { onPress } = this.props;
    if (onPress !== null && typeof onPress === 'function') {
      return (
        <View style={styles.container}>
          <Touchable onPress={onPress} delayPressIn={0} style={{ flex: 1 }}>
            <View style={styles.wrapper}>{props.children}</View>
          </Touchable>
        </View>
      );
    }

    return <View style={[styles.container, styles.wrapper]}>{props.children}</View>;
  };

  getIcon() {
    const { icon } = this.props;
    if (icon === null) {
      return () => null;
    }

    if (typeof icon === 'object') {
      const IconComponent = () => icon;
      return () => (
        <View style={styles.iconWrapper}>
          <View style={styles.icon}>
            <IconComponent style={styles.icon} size={24} />
          </View>
        </View>
      );
    }

    return () => (
      <View style={styles.iconWrapper}>
        <View style={styles.icon}>
          <Icon style={styles.icon} name={icon} size={24} />
        </View>
      </View>
    );
  }

  getContent() {
    const { firstLine, secondLine, contentComponent } = this.props;

    if (contentComponent !== null && typeof contentComponent === 'object') {
      const ContentComponent = () => contentComponent;
      return () => (
        <View style={styles.contentWrapper}>
          <ContentComponent />
        </View>
      );
    }

    const heightStyle = secondLine !== null ? styles.contentMultilines : null;
    return () => (
      <View style={[styles.contentWrapper, heightStyle]}>
        {firstLine !== null ? (
          <Text style={styles.firstLine} numberOfLines={1}>
            {firstLine}
          </Text>
        ) : null}
        {secondLine !== null ? (
          <Text style={styles.secondLine} numberOfLines={1}>
            {secondLine}
          </Text>
        ) : null}
      </View>
    );
  }

  getAction = props => {
    const { actionComponent, onActionPress, isSwitchable, switchInitialValue } = this.props;

    if (isSwitchable) {
      return (
        <View style={styles.actionWrapper}>
          <Switch
            value={switchInitialValue}
            onValueChange={() => onActionPress()}
            onTintColor={sharedStyles.ACCENT_COLOR_LIGHT}
            thumbTintColor={sharedStyles.ACCENT_COLOR}
          />
        </View>
      );
    }

    if (actionComponent !== null && typeof actionComponent === 'object') {
      const ActionComponent = () => actionComponent;
      return (
        <View style={styles.actionWrapper}>
          <ActionComponent
            onPress={() => onActionPress()}
            onValueChange={() => onActionPress()}
            {...props}
          />
        </View>
      );
    }

    return null;
  };
}

ListItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  firstLine: PropTypes.string,
  secondLine: PropTypes.string,
  contentComponent: PropTypes.element,
  actionComponent: PropTypes.element,
  isSwitchable: PropTypes.bool,
  switchInitialValue: PropTypes.bool,
  onPress: PropTypes.func,
  onActionPress: PropTypes.func
};

ListItem.defaultProps = {
  icon: null,
  firstLine: null,
  secondLine: null,
  contentComponent: null,
  actionComponent: null,
  isSwitchable: false,
  switchInitialValue: false,
  onPress: null,
  onActionPress: null
};

export default ListItem;
