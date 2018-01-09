import { connect } from 'react-redux';

import { fetchRepositories } from '../reducers/repositories/actions';
import { getAppsUniq } from '../reducers/applications/selectors';
import AppsTab from '../components/AppsTab';

const mapStateToProps = state => {
  const { reposFetched, reposCount } = state.repositories;
  return {
    reposSynced: reposCount > 0 && reposFetched === reposCount,
    apps: getAppsUniq(state.applications.apps)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRepos: () => {
      dispatch(fetchRepositories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppsTab);
