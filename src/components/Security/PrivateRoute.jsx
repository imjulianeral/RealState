import React, { useContext } from 'react'
import { Redirect } from '@reach/router'

import { FirebaseContext } from '../../firebase/fireContext'
import { useStateValue } from '../../firebase/store'

export default function PrivateRoute({ component: Component, ...rest }) {
  const [{ session }] = useStateValue()
  const { firebase } = useContext(FirebaseContext)

  if (
    (typeof session === 'undefined' || !session.auth) &&
    !firebase.auth().currentUser
  ) {
    return <Redirect noThrow to="/login" />
  }

  return <Component {...rest} />
}
