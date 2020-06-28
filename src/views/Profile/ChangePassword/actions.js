import {action} from '../../../utils'
import {ActionTypes} from '../../../constants'
import {api} from '../../../services'

export const changePassword = (oldPassword, newPassword, onChangeSuccess) => {
  return action.create(ActionTypes.CHANGE_PASSWORD, async ({getState}) => {
    const token = getState().user.token
    const response = await api.put('user/password',
      {oldPassword, newPassword}, token)
    const {isSuccess} = response
    isSuccess && onChangeSuccess(response.data.message)
    return response
  })
}
