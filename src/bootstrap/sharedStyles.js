const sharedStyles = {
  LOGO_COLORS: ['#e91e63', '#EEFF41', '#40C4FF', '#FF6E40', '#FFB74D'],
  HEADER_COLOR: '#e91e63',
  HEADER_TEXT_COLOR: '#ffffff',
  TAB_ACTIVE_COLOR: '#ffffff',
  TAB_INACTIVE_COLOR: '#fdfdfd',
  ACCENT_COLOR: '#e91e63',
  ACCENT_COLOR_LIGHT: 'rgba(225, 29, 98, .7)',
  ACCENT_COLOR_DARK: 'rgba(185, 21, 78, 1)',
  RIPPLES_COLOR_DEFAULT: '#DADADA'
};

sharedStyles = {
  ...sharedStyles,
  screenContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  headerStyle: {
    backgroundColor: sharedStyles.HEADER_COLOR,
    elevation: 0 // remove shadow on Android
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  tabTab: {
    padding: 8
  },
  tab: {
    padding: 0,
    backgroundColor: sharedStyles.HEADER_COLOR
  },
  tabIndicator: {
    backgroundColor: sharedStyles.HEADER_TEXT_COLOR,
    height: 3
  },
  tabIcon: {
    padding: 0,
    height: 50
  },
  emptyWrapper: {
    paddingHorizontal: 32,
    flex: 1
  }
};

export default sharedStyles;
