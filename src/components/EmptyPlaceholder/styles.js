import sharedStyles from '../../styles/sharedStyles';

const styles = {
  container: {
    ...sharedStyles.screenContainer,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    margin: 8,
    color: 'rgba(0,0,0,.64)',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(0,0,0,.44)',
    marginBottom: 4,
    textAlign: 'center'
  },
  note: {
    fontSize: 10,
    fontWeight: '200',
    fontStyle: 'italic',
    color: 'rgba(0,0,0,.24)',
    textAlign: 'center'
  }
};

export default styles;
