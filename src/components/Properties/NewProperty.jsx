import React, { useState, useContext } from 'react'
import { Link, navigate } from 'gatsby'
import {
  Container,
  makeStyles,
  Paper,
  Grid,
  Breadcrumbs,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { Home as HomeIcon } from '@material-ui/icons'
import ImageUploader from 'react-images-upload'

import { FirebaseContext } from '../../firebase/fireContext'
import { openSnackbar } from '../../firebase/actions/openSnackbarAction'
import { createKeyword } from '../../firebase/actions/keyword'
import { useStateValue } from '../../firebase/store'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '0.8rem',
  },
  paper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
  },
  link: {
    display: 'flex',
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: '0.4rem',
  },
  btn: {
    marginTop: 15,
    marginBottom: 10,
  },
  photo: {
    height: '10rem',
  },
}))

export default function NewProperty() {
  const [images, setImages] = useState([])
  const [property, setProperty] = useState({
    address: '',
    city: '',
    country: '',
    indescription: '',
    outdescription: '',
  })
  const { firebase } = useContext(FirebaseContext)
  const [_, dispatch] = useStateValue()
  const classes = useStyles()

  const handleChange = e => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    })
  }
  const saveMultipleImages = async images => {
    const ref = firebase.storage().ref()

    return await images.map(file => {
      ref.child(`properties/${file.alias}`).put(file)
      return ref.child(`properties/${file.alias}`).getDownloadURL()
    })
  }
  const saveProperty = async () => {
    Object.keys(images).forEach(key => {
      const dynamicValue = Math.floor(new Date().getTime() / 1000)
      const name = images[key].name
      const extension = name.split('.').pop()

      images[key].alias = `${name.split('.')[0]}_${dynamicValue}.${extension}`
        .replace(/\s/g, '_')
        .toLowerCase()
    })

    const searchText = `${property.address} ${property.city} ${property.country}`
    const keywords = createKeyword(searchText)

    const urls = saveMultipleImages(images)

    console.log(urls)

    property.images = urls
    property.keywords = keywords

    try {
      await firebase.firestore().collection('properties').add(property)
      navigate('/')
      console.log(_)
    } catch (error) {
      openSnackbar(dispatch, error)
    }
  }
  const uploadPhotos = photos => {
    Object.keys(photos).forEach(key => {
      photos[key].urlTemp = URL.createObjectURL(photos[key])
    })

    setImages(imgs => imgs.concat(photos))
  }
  const deletePhoto = photoName => () => {
    setImages(imgs => imgs.filter(pic => pic.name !== photoName))
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to="/" className={classes.link}>
                <HomeIcon className={classes.homeIcon} />
                Home
              </Link>
              <Typography color="textPrimary">New Property</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="address"
              label="Property Address"
              fullWidth
              variant="outlined"
              value={property.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="city"
              label="Property City"
              fullWidth
              variant="outlined"
              value={property.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="country"
              label="Property Country"
              fullWidth
              variant="outlined"
              value={property.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="indescription"
              label="Property Inside Description"
              multiline
              fullWidth
              variant="outlined"
              value={property.indescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="outdescription"
              label="Property Outside Description"
              multiline
              variant="outlined"
              value={property.outdescription}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item xs={12} sm={6}>
            <ImageUploader
              withIcon
              buttonText="Select Images"
              onChange={uploadPhotos}
              imgExtension={['.jpg', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Table>
              <TableBody>
                {images.map((img, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="left">
                      <img
                        src={img.urlTemp}
                        alt="property"
                        className={classes.photo}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={deletePhoto(img.name)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="primary"
              className={classes.btn}
              onClick={saveProperty}
            >
              Add property
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
