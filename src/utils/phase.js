/**
 * Redux middleware to simplify action dispatching.
 * Async actions will be dispatched in 3 phases.
 * Sync actions will be dispatched with the return value.
 */
export default function phase({START, END, FAIL}) {
  return ({dispatch, getState}) => {
    return (next) => (action) =>
      (action && typeof action.payload === 'function')
        ? phasify(action)
        : next(action)

    function phasify({type, payload: fn}) {
      const res = fn({dispatch, getState})

      if (res && typeof res.then === 'function') {
        dispatch({type: `${type}_${START}`})
        return res.then(
          (payload) => {
            const {isSuccess, error} = payload
            isSuccess ? dispatch({type: `${type}_${END}`, payload})
              : dispatch({type: `${type}_${FAIL}`, error: true, payload: error})
          },
          (err) => dispatch({type: `${type}_${FAIL}`, error: true, payload: err})
        )
      }
      else {
        return dispatch({type, payload: res})
      }
    }
  }
}
