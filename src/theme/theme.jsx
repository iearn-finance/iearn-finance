import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

export const colors = {
  white: "#fff",
  black: '#000',
  darkBlue: "#2c3b57",
  blue: "#2F80ED",
  gray: "#e1e1e1",
  lightGray: "#737373",
  lightBlack: "#6a6a6a",
  darkBlack: "#141414",
  green: '#1abc9c',
  red: '#ed4337',
  orange: 'orange',
  pink: '#DC6BE5',
  compoundGreen: '#00d395',
};

const breakpoints = createBreakpoints({
  keys: ["xs", "sm", "md", "lg", "xl"],
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1800
  }
})

const iswapTheme =  {
  typography: {
    lineHeight: '1rem',
    fontSize: '18px',
    fontWeight: '700',
    useNextVariants: true,
    h1: {
      fontSize: '1rem',
      fontWeight: 'bold',
      [breakpoints.up('md')]: {
        fontSize: '1.5rem',
      }
    },
    h2: {
      fontSize: '1rem',
      fontWeight: '500',
    },
    h3: {
      fontSize: '1rem',
      fontWeight: '500',
      color: 'rgb(1, 1, 1)',
    },
    h4: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#DC6BE5',
    },
    h5: {
      fontSize: '0.8rem',
      fontWeight: '500',
      color: 'rgb(174, 174, 174)',
    },
    h6: {
      fontSize: '0.825rem',
      color: '#DC6BE5',
    },
  },
  type: 'light',
  spacing: 8,
  overrides: {
    MuiSelect: {
      selectMenu: {
      },
      select: {
      },
      icon: {
        right: '8px'
      }
    },
    MuiInputBase: {
      root: {
        color: '#010101',
        fontSize: '1.5rem',
        background: 'none',
        fontWeight: '600',
        borderRadius: '1.25rem',
        [breakpoints.up('md')]: {
          fontSize: '1.5rem',
        }
      }
    },
    MuiExpansionPanel: {
      root: {
        padding: '10px',
        marginTop: '10px',
        '&:before': {
          display: 'none',
        },
        borderRadius: '20px',
        backgroundColor: 'white',
      },
      rounded: {
        //borderRadius: '20px',
      }
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(16px, 21px) scale(1)',
        [breakpoints.up('md')]: {
          transform: 'translate(28px, 31px) scale(1)',
        }
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: '1.1rem',
        [breakpoints.up('md')]: {
          fontSize: '1.3rem',
        }
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: '20px',
        [breakpoints.up('md')]: {
          padding: '20px',
        }
      },
      notchedOutline: {
        borderRadius: '1.25rem',
      }
    },
    MuiPrivateNotchedOutline: {
      root: {
      }
    },
    MuiButton: {
      label: {
        fontSize: '1rem',
        fontWeight: '700',
        textTransform: 'none'
      },
      outlined: {
        fontWeight: '700',
        fontSize: '1rem',
        minWidth: '250px'
      }
    },
    MuiSnackbar : {
      root: {
        maxWidth: 'calc(100vw - 24px)'
      },
      anchorOriginBottomLeft: {
        bottom: '12px',
        left: '12px',
        '@media (min-width: 960px)': {
          bottom: '50px',
          left: '80px'
        }
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: colors.white,
        padding: '0px',
        minWidth: 'auto',
        '@media (min-width: 960px)': {
          minWidth: '500px',
        }
      },
      message: {
        padding: '0px'
      },
      action: {
        marginRight: '0px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '0 12px 12px',
        '@media (min-width: 960px)': {
          padding: '0 24px 24px',
        }
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        padding: '0 12px 0 12px',
        '@media (min-width: 960px)': {
          padding: '0 24px 0 24px',
        }
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: '0 12px 0 12px',
        '@media (min-width: 960px)': {
          padding: '0 24px 0 24px',
        }
      }
    }
  },
  palette: {
    primary: {
      main: colors.pink,
      contrastText: colors.white
    },
    secondary: {
      main: colors.blue
    },
    background:{
      paper: colors.white,
      default: colors.white
    },
  },
  breakpoints: breakpoints
};

export default iswapTheme;
