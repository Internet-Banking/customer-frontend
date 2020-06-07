import {ActionTypes, TOKEN_STATE} from '../constants'
import {action, jwt} from '../utils'
import {auth, api} from '../services'

export const initApp = () => {
  return action.create(ActionTypes.INIT_APP, async () => {
    const token = auth.getToken()

    if (!token) return {isSuccess: true, undefined}

    const state = jwt.getTokenState(token)
    try {
      if (state === TOKEN_STATE.INVALID || state === TOKEN_STATE.EXPIRED) {
        // auth.removeToken()
        return {isSuccess: false, error: {message: `Token is ${state.toLowercase()}`}}
      }

      // TODO: Profile view
      // const user = await api.get({url: 'user/me', token})
      // return {user, token}
      return {isSuccess: true, undefined}
    }
    catch (error) {
      auth.removeToken()
      return {isSuccess: false, error: {message: 'Failed to fetch'}}
    }
  })
}
