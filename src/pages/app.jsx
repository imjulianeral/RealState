import React from 'react'
import { Router } from '@reach/router'

import Layout from '../components/Layout'
import Profile from '../components/Security/Profile'
import PrivateRoute from '../components/Security/PrivateRoute'
import NewProperty from '../components/Properties/NewProperty'
export default function app() {
  return (
    <Layout>
      <Router basepath="/app">
        <PrivateRoute component={Profile} path="/profile" />
        <PrivateRoute component={NewProperty} path="/new/property" />
      </Router>
    </Layout>
  )
}
