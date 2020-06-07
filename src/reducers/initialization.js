import {ActionTypes} from '../constants'

export default (state = false, {type}) => {
  switch (type) {
    case ActionTypes.INIT_APP_END:
      return true

    default:
      return state
  }
}
