import sharedStyles from '../../bootstrap/sharedStyles';

const styles = {
  container: {
    marginBottom: 8
    // marginHorizontal: 8
  },
  result: {
    elevation: 1,
    margin: 2,
    marginBottom: 3,
    backgroundColor: 'white'
  },
  resultContent: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  appName: {
    fontWeight: 'bold',
    color: 'black'
  },
  appSummary: {
    fontSize: 10,
    paddingRight: 16
  },
  appIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
    resizeMode: 'contain'
  },
  iconWrapper: {
    flex: 0
  },
  textsWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1
  }
};

export default styles;
