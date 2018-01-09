import sharedStyles from '../../bootstrap/sharedStyles';

const styles = {
  container: {
    ...sharedStyles.screenContainer,
    backgroundColor: '#FAFAFA',
    paddingTop: 8
  },
  headerWrapper: {
    elevation: 1,
    margin: 2,
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  resultHighlight: {
    fontWeight: 'bold',
    color: sharedStyles.ACCENT_COLOR
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8
  }
};

export default styles;
