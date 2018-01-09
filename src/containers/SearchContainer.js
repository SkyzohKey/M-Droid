import { connect } from 'react-redux';
import SearchScreen from '../components/SearchScreen';

const mapStateToProps = state => {
  return {
    apps: state.applications.apps
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
