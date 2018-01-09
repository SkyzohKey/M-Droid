import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPackageNameForUrl } from '../utils/fdroid';

const mapStateToProps = state => {
  return {
    apps: state.applications.apps,
    appsLoaded:
      state.repositories.reposCount > 0 &&
      state.repositories.reposCount === state.repositories.reposFetched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDetails: app => {
      dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'AppDetails',
        params: { app: app || null }
      });
    },
    openListing: (apps, name) => {
      dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'Listing',
        params: { apps: apps, name: name }
      });
    }
  };
};

class DeepLinkingProvider extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    apps: PropTypes.array.isRequired,
    appsLoaded: PropTypes.bool.isRequired,
    openDetails: PropTypes.func.isRequired,
    openListing: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('DeepLinkingProvider mounted.');

    Linking.getInitialURL()
      .then(url => this.handleOpenURL(url))
      .catch(err => console.log(err));

    Linking.addEventListener('url', event => this.handleOpenURL(event.url));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', event => this.handleOpenURL(event.url));
  }

  handleOpenURL = url => {
    const { appsLoaded } = this.props;
    if (url !== null) {
      console.log('Initial URL is ' + url);
      if (appsLoaded) {
        this.navigate(url);
      } else {
        this.uriHandler = setInterval(() => {
          if (appsLoaded) {
            this.navigate(url);
          }
        }, 500);
      }
    }
  };

  // TODO: handle https://${url}/fdroid/repo to add a repo.
  navigate(url) {
    if (this.uriHandler) {
      clearInterval(this.uriHandler);
    }

    const { openDetails, openListing } = this.props;
    const id = getPackageNameForUrl(url);
    const maybeAppsOrApp = this.props.apps.filter(item => item.id === id);

    console.log(maybeAppsOrApp);

    if (maybeAppsOrApp.length <= 1) {
      console.log('open details ' + id);
      openDetails(maybeAppsOrApp[0]);
    } else if (maybeAppsOrApp.length > 1) {
      openListing(maybeAppsOrApp, id);
    } else {
      // ^ This should never happens, but still.
      if (__DEV__) {
        // eslint-disable-next-line
        console.log('Something (really) weird has happened...');
      }
      return;
    }
  }

  render() {
    return this.props.children;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeepLinkingProvider);
