import { connect } from 'react-redux';
import { fetchRepositories } from '../reducers/repositories/actions';
import AppDetailsScreen from '../components/AppDetailsScreen';

const mapStateToProps = state => {
  return {
    apps: state.applications.apps
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppDetailsScreen);
