import React, { useState, useEffect, useContext } from 'react'

import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core'
import ImageUploader from 'react-images-upload'

import { useStateValue } from '../../firebase/store'
import { FirebaseContext } from '../../firebase/fireContext'
import { openSnackbar } from '../../firebase/actions/openSnackbarAction'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: '6rem',
    height: '6rem',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  paper: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
}))

export default function Profile() {
  const classes = useStyles()
  const { firebase } = useContext(FirebaseContext)
  const [{ session }, dispatch] = useStateValue()
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    id: '',
    photo: '',
  })

  useEffect(() => {
    if (user.id === '' && session) {
      setUser(session.user)
    }
  }, [user.id, session])

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const onDrop = async pictures => {
    await firebase
      .storage()
      .ref()
      .child(`avatar/avatar_${firebase.auth().currentUser.uid}`)
      .put(pictures[0])

    const url = await firebase
      .storage()
      .ref()
      .child(`avatar/avatar_${firebase.auth().currentUser.uid}`)
      .getDownloadURL()

    setUser({
      photo: url,
    })
  }

  const updateAccount = async e => {
    e.preventDefault()

    try {
      await firebase
        .firestore()
        .doc(`users/${firebase.auth().currentUser.uid}`)
        .set(user, { merge: true })

      dispatch({
        type: 'LOGIN',
        session: user,
        auth: true,
      })

      openSnackbar(dispatch, { message: 'The changes have been saved' })
    } catch (error) {
      openSnackbar(dispatch, { message: `Error ${error}` })
    }
  }

  if (!session.auth) return null
  return (
    <Container>
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={user.photo} />
        <Typography variant="h5">Profile</Typography>
        <form className={classes.form} onSubmit={updateAccount}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={user.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="lastname"
                label="Lastname"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={user.lastname}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={user.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={user.phone}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                className={classes.submit}
              >
                Update Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
