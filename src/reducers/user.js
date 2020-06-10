import {ActionTypes} from '../constants'

const intialState = {
  info: null,
  token: null
}
export default (state = intialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.INIT_APP_END: {
      const {token} = payload
      return {
        ...state,
        // TODO: Profile view => return with info payload
        // payload.info,
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
    default:
      return state
  }
}
