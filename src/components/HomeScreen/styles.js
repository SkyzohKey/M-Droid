import sharedStyles from '../../bootstrap/sharedStyles';

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: sharedStyles.HEADER_COLOR
  },
  headerLogo: {
    flex: 1,
    resizeMode: 'contain',
    height: 40,
    width: 150
  },
  container: {
    ...sharedStyles.screenContainer
  }
};

export default styles;
