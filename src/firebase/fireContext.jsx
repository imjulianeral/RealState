import React, { createContext, useState, useEffect } from 'react'
import useFire from '../hooks/useFire'

import { initialState } from './initialState'
import { StateProvider } from './store'
import mainReducer from './reducers'

export const FirebaseContext = createContext()

function FirebaseProvider({ children }) {
  const [isLoading, setLoading] = useState(true)
  const firebase = useFire()

  useEffect(() => {
    if (firebase) setLoading(false)
  }, [firebase])

  if (isLoading || typeof window === 'undefined') return <p>Loading...</p>
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <StateProvider initialState={initialState} reducer={mainReducer}>
        {children}
      </StateProvider>
    </FirebaseContext.Provider>
  )
}

export default ({ element }) => <FirebaseProvider>{element}</FirebaseProvider>
