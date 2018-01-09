// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, NativeModules } from 'react-native';

// Debuggers.
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import Reactotron from 'reactotron-react-native';
import './bootstrap/reactotron';

// redux related (middlewares, integrations, etc).
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider as ReduxProvider, connect } from 'react-redux';

// react-navigation stuff.
import { NavigationActions, addNavigationHelpers } from 'react-navigation';

// app specific imports.
import { config } from './bootstrap/config';
import { primaryRoutes } from './bootstrap/routes';
import { getRootReducer } from './reducers';

const { UIManager } = NativeModules;

const Navigator = primaryRoutes;
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
    this.handler = BackHandler.addEventListener('hardwareBackPress', () => this.onBackPress());
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
    if (this.isDrawerOpen(navigation)) {
      this.closeDrawer();
      return true;
    }

    if (this.shouldCloseApp(navigation)) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  isDrawerOpen = navigation => {
    return navigation.routes[0].index === 1;
  };

  closeDrawer = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'DrawerClose'
      })
    );
  };

  shouldCloseApp = navigation => {
    if (navigation.index > 0) {
      return false;
    }

    if (navigation.routes) {
      return navigation.routes.every(this.shouldCloseApp);
    }

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

    this.store = Reactotron.createStore(
      getRootReducer(navigationReducer),
      {},
      composeWithDevTools(applyMiddleware(...middlewares))
    );
  }

  componentWillMount() {
    // Enable animations support on Android.
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
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
