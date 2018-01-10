import sharedStyles from '../../styles/sharedStyles';

const styles = {
  container: {
    ...sharedStyles.screenContainer,
    backgroundColor: '#DADADA',
    height: 160
  },
  appInfos: {
    backgroundColor: 'rgba(0,0,0,.0)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 4
  }
};

export default styles;
