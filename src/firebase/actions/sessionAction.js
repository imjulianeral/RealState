export function login(dispatch, firebase, email, password) {
  return new Promise(async (resolve, eject) => {
    try {
      const newUser = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      const userDB = await firebase
        .firestore()
        .doc(`users/${newUser.user.uid}`)
        .get()

      dispatch({
        type: 'LOGIN',
        session: { id: userDB.id, ...userDB.data() },
        auth: true,
      })
      resolve({ status: true })
    } catch (error) {
      resolve({ status: false, message: error })
    }
  })
}

export function createUser(dispatch, firebase, userData) {
  return new Promise(async (resolve, eject) => {
    try {
      const newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
      await firebase.firestore().doc(`users/${newUser.user.uid}`).set(
        {
          email: userData.email,
          name: userData.name,
          lastname: userData.lastname,
        },
        { merge: true }
      )

      userData.id = newUser.user.uid
      dispatch({
        type: 'LOGIN',
        session: userData,
        auth: true,
      })

      resolve({ status: true })
    } catch (error) {
      resolve({ status: false, message: error })
    }
  })
}

export function logout(dispatch, firebase) {
  return new Promise(async (resolve, eject) => {
    await firebase.auth().signOut()
    dispatch({
      type: 'LOGOUT',
      session: {
        name: '',
        lastname: '',
        email: '',
        photo: '',
        id: '',
        phone: '',
      },
      auth: false,
    })
    resolve()
  })
}
