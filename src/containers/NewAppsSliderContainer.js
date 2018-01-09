import { connect } from 'react-redux';

import { getFeaturedApps } from '../reducers/applications/selectors';
import NewAppsSlider from '../components/NewAppsSlider';

const mapStateToProps = state => {
  return {
    featuredApps: getFeaturedApps(state.applications.apps)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDetails: app => {
      dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'AppDetails',
        params: { app: app }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAppsSlider);
