import {ActionTypes} from '../constants'

const intialState = {
  info: null,
  token: null
}
export default (state = intialState, {type, payload}) => {
  switch (type) {
    // TODO: Profile view
    // case ActionTypes.INIT_APP_END:
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
