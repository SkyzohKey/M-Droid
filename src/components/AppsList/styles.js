import sharedStyles from '../../bootstrap/sharedStyles';

const styles = {
  container: {
    ...sharedStyles.screenContainer,
    backgroundColor: '#FAFAFA'
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 12
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerTitle: {
    marginLeft: 8,
    color: 'black',
    fontWeight: 'bold'
  },
  moreButton: {
    padding: 8
  },
  moreText: {
    color: '#BABABA',
    fontSize: 12,
    fontWeight: 'bold'
  }
};

export default styles;
