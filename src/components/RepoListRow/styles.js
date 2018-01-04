import sharedStyles from '../../bootstrap/sharedStyles';

const styles = {
  container: {
    ...sharedStyles.screenContainer
  },
  row: {
    elevation: 0,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1
    // backgroundColor: 'white'
  },
  rowContent: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  name: {
    fontWeight: 'bold',
    color: 'black'
  },
  summary: {
    fontSize: 10,
    paddingRight: 16
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
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
