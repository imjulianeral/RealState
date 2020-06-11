import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import { MuiThemeProvider } from '@material-ui/core'
import theme from './MaterialUI/theme'

import Header from './Navbar/Header'
import { useStateValue } from '../firebase/store'

import 'normalize.css'

const Layout = ({ children }) => {
  const [{ openSnackbar }, dispatch] = useStateValue()

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const handleClose = () =>
    dispatch({
      type: 'OPEN',
      display: false,
      message: '',
    })

  return (
    <MuiThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar && openSnackbar.display}
        autoHideDuration={3000}
        message={openSnackbar && openSnackbar.message.message}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="secondary"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
        onClose={handleClose}
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
    </MuiThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
