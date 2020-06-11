import React, { useState, useContext } from 'react'
import { navigate } from 'gatsby'
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

import { FirebaseContext } from '../../firebase/fireContext'
import { createUser } from '../../firebase/actions/sessionAction'
import { useStateValue } from '../../firebase/store'
import { openSnackbar } from '../../firebase/actions/openSnackbarAction'

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 8,
    backgroundColor: '#e53935',
  },
  form: {
    width: '100%',
    marginTop: 10,
  },
  submit: {
    marginTop: 40,
    marginBottom: 20,
  },
}))
const initialState = {
  name: '',
  lastname: '',
  email: '',
  password: '',
}

export default function SignUp() {
  const classes = useStyles()
  const { firebase } = useContext(FirebaseContext)
  const [user, setUser] = useState(initialState)
  const [{ session }, dispatch] = useStateValue()

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const signUpUser = async e => {
    e.preventDefault()

    const callback = await createUser(dispatch, firebase, user)

    if (callback.status) return navigate('/login')

    openSnackbar(dispatch, callback.message)

    setUser(initialState)
  }
  console.log(session)
  return (
    <Container maxWidth="md">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Create your account</Typography>
        <form className={classes.form} onSubmit={signUpUser}>
          <Grid container spacing={2} justify="center">
            <Grid item md={6} xs={12}>
              <TextField
                name="name"
                fullWidth
                label="Name"
                value={user.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="lastname"
                fullWidth
                label="Last Name"
                value={user.lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                name="email"
                fullWidth
                label="Email"
                value={user.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                type="password"
                name="password"
                fullWidth
                label="Password"
                value={user.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="center">
            <Grid item md={6} xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
