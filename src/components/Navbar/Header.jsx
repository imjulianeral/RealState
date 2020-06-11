import React, { useEffect, useContext, useState } from 'react'
import { Link, navigate } from 'gatsby'
import PropTypes from 'prop-types'

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  makeStyles,
  Drawer,
  Avatar,
} from '@material-ui/core'
import { Menu, MoreVert, MailOutline } from '@material-ui/icons'

import { useStateValue } from '../../firebase/store'
import { FirebaseContext } from '../../firebase/fireContext'
import { logout } from '../../firebase/actions/sessionAction'
import RightMenu from './RightMenu'
import LeftMenu from './LeftMenu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
  listItemText: {
    fontSize: '1.4rem',
    fontWeight: 600,
    paddingLeft: '1.5rem',
    color: '#212121',
  },
  list: {
    width: 250,
  },
}))

const Header = ({ siteTitle }) => {
  const classes = useStyles()
  const [{ right, left }, setOpen] = useState({ right: false, left: false })
  const [{ session }, dispatch] = useStateValue()
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    async function getUser() {
      if (firebase.auth().currentUser !== null && !session) {
        const userDB = await firebase
          .doc(`users/${firebase.auth().currentUser.uid}`)
          .get()

        dispatch({
          type: 'LOGIN',
          session: userDB,
          auth: true,
        })
      }
    }
    getUser()
  }, [dispatch, session, firebase])

  const toggleDrawer = (side, open) => {
    setOpen({ [side]: open })
  }
  const signOut = async () => {
    await logout(dispatch, firebase)
    navigate('/login')
  }

  if (typeof session === 'undefined' || !session.auth || !session.user)
    return null
  return (
    <AppBar position="static">
      <Drawer
        open={right}
        onClose={() => toggleDrawer('right', false)}
        anchor="right"
      >
        <div
          role="button"
          onClick={() => toggleDrawer('right', false)}
          onKeyDown={() => toggleDrawer('right', false)}
          tabIndex={0}
        >
          <RightMenu
            classes={classes}
            user={session && session.user}
            logout={signOut}
          />
        </div>
      </Drawer>
      <Drawer
        open={left}
        onClose={() => toggleDrawer('left', false)}
        anchor="left"
      >
        <div
          role="button"
          onClick={() => toggleDrawer('left', false)}
          onKeyDown={() => toggleDrawer('left', false)}
          tabIndex={0}
        >
          <LeftMenu classes={classes} />
        </div>
      </Drawer>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => toggleDrawer('left', true)}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Button
            component={Link}
            to="/"
            style={{
              fontSize: '1.3rem',
              textTransform: 'none',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            {siteTitle}
          </Button>
        </Typography>
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit" component={Link} to="">
            <MailOutline />
          </IconButton>
          <Button color="inherit" onClick={signOut}>
            Logout
          </Button>
          <Button color="inherit">{`${session.user.name} ${session.user.lastname}`}</Button>
          <Avatar src={session.user.photo} />
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer('right', true)}
          >
            <MoreVert />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
