const styles = {
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: '4px 2px',
    },
    chipFocused: {
      backgroundColor: 'rgba(0 ,0 ,0 , 0.8)',
    },
    noOptionsMessage: {
      padding: `8px 16px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: 8,
      left: 0,
      right: 0,
    },
    divider: {
      height: 26,
    },
    formControl: {
        paddingBottom: '10px',
        margin: '27px 0 0 0',
        position: 'relative',
    }
  }

  export default styles;