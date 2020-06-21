import {ActionTypes} from '../constants'

const initialState = {
  info: null,
  token: null
}
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.INIT_APP_END: {
      const {token, user} = payload
      return {
        ...state,
        info: user,
        token
      }
    }
    case ActionTypes.LOGIN_END: {
      const {payload: info, token} = payload.data
      return {
        ...state,
        info,
        token
      }
    }
    case ActionTypes.LOGOUT: {
      return {...initialState}
    }
    default:
      return state
  }
}
