import sharedStyles from '../../bootstrap/sharedStyles';

const styles = {
  container: {
    ...sharedStyles.screenContainer,
    backgroundColor: '#FAFAFA',
    paddingTop: 8
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    flex: 1,
    elevation: 3
  },
  searchInput: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  searchInputText: {
    color: sharedStyles.HEADER_TEXT_COLOR
  },
  results: {
    padding: 8
  },
  resultsTitle: {
    color: 'black',
    marginLeft: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8
  }
};

export default styles;
