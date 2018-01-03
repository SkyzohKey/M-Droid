import sharedStyles from '../../bootstrap/sharedStyles';

const styles = {
  container: {
    ...sharedStyles.screenContainer,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    margin: 8,
    color: 'rgba(0,0,0,.64)',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  punchline: {
    fontSize: 18,
    color: 'rgba(0,0,0,.44)',
    marginBottom: 4
  },
  meaculpa: {
    fontSize: 10,
    fontWeight: '200',
    fontStyle: 'italic',
    color: 'rgba(0,0,0,.24)'
  }
};

export default styles;
