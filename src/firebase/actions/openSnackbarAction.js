export function openSnackbar(dispatch, message) {
  dispatch({
    type: 'OPEN',
    display: true,
    message,
  })
}
