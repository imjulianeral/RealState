import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontSize: 9,
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#10A75F',
    },
    secondary: {
      main: '#E53935',
    },
    common: {
      white: 'white',
    },
  },
  spacing: 10,
})

export default theme
