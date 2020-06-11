export const initialState = {
  message: '',
  display: false,
}

const openSnackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        message: action.message,
        display: action.display,
      }

    default:
      return state
  }
}

export default openSnackbarReducer
