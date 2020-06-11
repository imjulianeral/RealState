import React from 'react'

import { FirebaseContext } from './fireContext'

export const FirebaseConsumer = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)
