import {ActionTypes, TOKEN_STATE} from '../constants'
import {action, jwt} from '../utils'
import {auth, api} from '../services'

export const initApp = () => {
  return action.create(ActionTypes.INIT_APP, async () => {
    const token = auth.getToken()

    if (!token) return {isSuccess: true, token}

    const state = jwt.getTokenState(token)
    try {
      if (state === TOKEN_STATE.INVALID || state === TOKEN_STATE.EXPIRED) {
        auth.removeToken()
        return {isSuccess: false, error: {message: `Token is ${state.toLowerCase()}`}}
      }

      const {isSuccess, data: {payload: user, message}} = await api.get('user/me', undefined, token)
      if (!isSuccess) throw new Error(message)
      return {isSuccess, user, token}
    }
    catch (error) {
      auth.removeToken()
      return {isSuccess: false, error: {message: error.message}}
    }
  })
}

export const logOut = () => {
  return action.create(ActionTypes.LOGOUT, () => {
    auth.removeToken()
  })
}
