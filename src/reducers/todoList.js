import {ADD_TODO} from '../constants'

const defaultState = []
const todoList = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const {id} = action.payload
      return [...state, id]
    }
    default:
      return state
  }
}

export default todoList
