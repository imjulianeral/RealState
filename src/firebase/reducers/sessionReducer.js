export const initialState = {
  user: {
    name: '',
    lastname: '',
    email: '',
    photo: '',
    id: '',
    phone: '',
  },
  auth: true,
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.session,
        auth: action.auth,
      }
    case 'CHANGE_SESSION':
      return {
        ...state,
        user: action.newUser,
        auth: action.auth,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: action.session,
        auth: action.auth,
      }

    default:
      return state
  }
}

export default sessionReducer
