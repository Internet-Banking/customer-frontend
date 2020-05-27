import {VISIBILITY_FILTERS, SET_FILTER} from '../constants'

const defaultState = VISIBILITY_FILTERS.ALL

const visibilityFilter = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter
    }
    default: {
      return state
    }
  }
}

export default visibilityFilter
