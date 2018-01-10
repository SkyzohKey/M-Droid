import sharedStyles from '../../styles/sharedStyles';

const ITEM_HEIGHT = 56;
const ITEM_MAX_HEIGHT = 88;
/**
 * Style for ListItem component.
 * @see https://material.io/guidelines/components/lists.html#lists-specs
 */
const styles = {
  container: {
    minHeight: ITEM_HEIGHT,
    maxHeight: ITEM_MAX_HEIGHT
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  iconWrapper: {
    width: 56,
    minWidth: 56,
    maxWidth: 56,
    minHeight: ITEM_HEIGHT,
    maxHeight: ITEM_MAX_HEIGHT,
    paddingLeft: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    height: 24,
    width: 24
  },
  contentWrapper: {
    minHeight: ITEM_HEIGHT,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16
  },
  contentMultilines: {
    height: ITEM_MAX_HEIGHT
  },
  actionWrapper: {
    paddingHorizontal: 16,
    minHeight: ITEM_HEIGHT,
    maxHeight: ITEM_MAX_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  firstLine: {
    fontSize: 16,
    color: '#212121'
  },
  secondLine: {
    fontSize: 14,
    color: '#757575'
  }
};

export default styles;
