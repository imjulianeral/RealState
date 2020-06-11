import sessionReducer from './sessionReducer'
import openSnackbarReducer from './openSnackbarReducer'

export default function mainReducer({ session, openSnackbar }, action) {
  return {
    session: sessionReducer(session, action),
    openSnackbar: openSnackbarReducer(openSnackbar, action),
  }
}
