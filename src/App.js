// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { BackHandler, NativeModules } from "react-native";

// redux related (middlewares, integrations, etc).
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider as ReduxProvider, connect } from "react-redux";

// react-navigation stuff.
import {
  NavigationActions,
  StackNavigator,
  addNavigationHelpers
} from "react-navigation";

// app specific imports.
import { config } from "./bootstrap/config";
import { routes } from "./bootstrap/routes";
import { getRootReducer } from "./reducers";

const { UIManager } = NativeModules;

const Navigator = StackNavigator(routes);
const navigationReducer = (state, action) => {
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
};

export class NavigationWrapper extends Component {
  static propTypes = {
    dispatch: PropTypes.any,
    navigation: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.handler = null;
  }

  componentWillMount() {
    this.handler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.onBackPress
    );
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-unused-expressions
    this.handler && this.handler.remove();
  }

  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation
        })}
      />
    );
  }

  onBackPress = () => {
    const { dispatch, navigation } = this.props;
    if (navigation.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };
}

const mapStateToProps = state => ({ navigation: state.navigation });
const NavigationProvider = connect(mapStateToProps)(NavigationWrapper);

// Actual App initialization code.
export class App extends Component {
  constructor(props) {
    super(props);

    const middlewares = [thunk];

    this.store = createStore(
      getRootReducer(navigationReducer),
      {},
      /*__DEV__ && IS_TESTING !== true // eslint-disable-line no-undef
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
            // eslint-disable-line no-underscore-dangle
            applyMiddleware(...middlewares)
          )
        :*/ applyMiddleware(
        ...middlewares
      )
    );
  }

  componentWillMount() {
    // Enable animations support on Android.
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    // TODO: this._checkForUpdates();
  }

  render() {
    // TODO: Add PersistGate if needed.
    // TODO: Add StyleProvider from NativeBase.
    return (
      <ReduxProvider store={this.store}>
        <NavigationProvider />
      </ReduxProvider>
    );
  }
}

// TODO: Connect CodePush to App.
const Root = App;
export default Root;
