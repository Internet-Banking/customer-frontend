import {action} from '../../../utils'
import {ActionTypes} from '../../../constants'
import {api, auth} from '../../../services'

export const submitLogin = (payload, recaptchaToken) => {
  return action.create(ActionTypes.LOGIN, async () => {
    const {remember} = payload
    delete payload.remember
    
    if (!recaptchaToken) {
      return {isSuccess: false, error: 'Invalid captcha'}
    }

    const response = await api.post('user/login', payload)
    const {isSuccess, data} = response
    isSuccess && auth.saveToken(data.token, remember)
    return response
  })
}
