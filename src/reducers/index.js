import {combineReducers} from 'redux'
// import todoList from './todoList'
// import todoMap from './todoMap'
// import visibilityFilter from './visibilityFilter'
import initialized from './initialization'
import error from './error'
import user from './user'

export default combineReducers({initialized, user, error})
