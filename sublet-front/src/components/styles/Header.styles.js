const makeHeaderStyle = () => {
  const styles = {
    container: {
      borderBottom: '1px solid gray',
      marginBottom: '0.5em',
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    logoContainer: {
      display: 'flex',
      flex: 1,
    },
    logoIcon: {
      width: '4em',
      height: '100%',
      color: 'rgba(0, 0, 0, 1)',
      justifyContent: 'left',
    },
    searchBoxContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '0 0 0.5em 0',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #000000',
      borderRadius: '5px',
      padding: '1em',
      fontSize: '1.3em',
      flex: 5,
    },
    searchByLocation: {
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 1)',
    },
    searchByKeywordContainer: {
      display: 'flex',
      flex: 1,
    },
    serachByKeyword: {
      marginRight: '0.5em',
    },
    searchKeywordBig: {
      border: '0px',
      fontWeight: 'bold',
    },
    serachByKeywordInput: {
      display: 'flex',
      flex: 1,
      border: '1px',
    },
    searchKeyworddescription: {
      fontSize: '0.6em',
      textAlign: 'left',
    },
    searchIcon: {
      color: 'rgba(0, 0, 0, 1)',
    },
    rightNavigation: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right',
      flex: 1,
    },
    favorite: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '1em',
      color: 'rgba(0, 0, 0, 1)',
    },
    favoriteCount: {
      fontSize: '0.8em',
    },
    profile: {
      color: 'rgba(0, 0, 0, 1)',
    },
  }
  return styles;
};

export default makeHeaderStyle;