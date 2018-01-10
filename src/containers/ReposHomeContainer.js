import { connect } from 'react-redux';

import { getReposUniq } from '../reducers/repositories/selectors';
import { fetchRepositories, toggleRepository } from '../reducers/repositories/actions';

import ReposHomeScreen from '../components/ReposHomeScreen';

const mapStateToProps = state => {
  const { reposByPubkey } = state.repositories;
  return {
    repos: getReposUniq(Object.keys(reposByPubkey).map(key => reposByPubkey[key]))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDetails: repoKey => {
      dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'RepoDetails',
        params: { app: repoKey }
      });
    },
    refreshRepositories: () => {
      dispatch(fetchRepositories());
    },
    toggleRepo: repo => {
      dispatch(toggleRepository(repo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReposHomeScreen);
