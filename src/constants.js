import keyMirror from 'key-mirror'
import {action} from './utils'

const _phases = ['START', 'END', 'FAIL']
const _actionTypes = [
  'LOGIN'
]

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export const Phases = keyMirror(action.arrayToObject(_phases))
// Put action types here, each action will have 3 phases: START, END, FAIL
export const ActionTypes = keyMirror(action.arrayToObject(action.merge(_actionTypes, _phases)))

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_FILTER = 'SET_FILTER'
export const VISIBILITY_FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete'
}
