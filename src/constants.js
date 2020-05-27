import keyMirror from 'key-mirror'
import {action} from './utils'
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

// Put action types here, each action will have 3 phases: START, END, FAIL
const ActionTypes = [
  'LOGIN'
]

const Phases = [
  'START',
  'END',
  'FAIL'
]

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_FILTER = 'SET_FILTER'
export const VISIBILITY_FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete'
}

export default {
  API_URL,
  Phases: keyMirror(action.arrayToObject(Phases)),
  ActionTypes: keyMirror(action.arrayToObject(action.merge(ActionTypes, Phases)))
}
