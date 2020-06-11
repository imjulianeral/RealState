import React, { useState, useContext } from 'react'
import { navigate } from 'gatsby'
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

import { FirebaseContext } from '../../firebase/fireContext'
import { useStateValue } from '../../firebase/store'
import { login } from '../../firebase/actions/sessionAction'
import { openSnackbar } from '../../firebase/actions/openSnackbarAction'

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 5,
    backgroundColor: 'red',
  },
  form: {
    width: '100%',
    marginTop: 8,
  },
}))

export default function Login() {
  const classes = useStyles()
  const { firebase } = useContext(FirebaseContext)
  const [{ session }, dispatch] = useStateValue()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const signIn = async e => {
    e.preventDefault()

    // try {
    //   await firebase
    //     .auth()
    //     .signInWithEmailAndPassword(user.email, user.password)

    //   navigate('/app/profile')
    // } catch (error) {
    //   console.error(error)
    // }

    const callback = await login(dispatch, firebase, user.email, user.password)

    if (callback.status) return navigate('/app/profile')

    openSnackbar(dispatch, callback.message)
  }
  console.log(session)
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Sign In</Typography>
        <form className={classes.form} onSubmit={signIn}>
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </Container>
  )
}
