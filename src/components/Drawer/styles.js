import sharedStyles from '../../bootstrap/sharedStyles';

const styles = {
  container: {
    ...sharedStyles.screenContainer,
    backgroundColor: '#FFFFFF'
  },
  wrapper: {
    flex: 1
  },
  header: {
    backgroundColor: sharedStyles.HEADER_COLOR,
    height: 150
  },
  headerLogo: {
    resizeMode: 'contain',
    width: 250
  },
  versionContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  version: {
    fontSize: 10,
    color: 'white',
    textAlign: 'right'
  }
};

export default styles;
