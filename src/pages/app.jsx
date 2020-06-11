import React from 'react'
import { Router } from '@reach/router'

import Layout from '../components/Layout'
import Profile from '../components/Security/Profile'
import PrivateRoute from '../components/Security/PrivateRoute'
export default function app() {
  return (
    <Layout>
      <Router basepath="/app">
        <PrivateRoute component={Profile} path="/profile" />
      </Router>
    </Layout>
  )
}
