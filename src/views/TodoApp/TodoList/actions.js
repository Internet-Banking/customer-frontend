import {TOGGLE_TODO} from '../../../constants'

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: {id}
})
