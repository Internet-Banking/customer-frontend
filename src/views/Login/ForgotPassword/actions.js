import {action} from '../../../utils'
import {ActionTypes} from '../../../constants'
import {api} from '../../../services'

export const sendOtp = (email, setIsOtpSent) => {
  return action.create(ActionTypes.FORGOT, async () => {
    const response = await api.post('user/otp_without_auth', {email})
    const {isSuccess} = response
    isSuccess && setIsOtpSent(true)
    return response
  })
}

export const changePassword = (email, otp, password, setIsOtpValid) => {
  return action.create(ActionTypes.CHANGE_PASSWORD, async () => {
    const response = await api.put('user/forgot_password',
      {email, otpDigits: otp, newPassword: password})
    const {isSuccess} = response
    isSuccess && setIsOtpValid(true)
    return response
  })
}
