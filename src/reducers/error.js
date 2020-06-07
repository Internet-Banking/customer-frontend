import {debug} from '../utils'

const formatError = (error) => {
  if (process.env.NODE_ENV === 'development') debug.error('app', error)

  if (error.message === 'Failed to fetch') {
    error.message = 'The server is temporarily unavailable, please try again later'
  }

  return error.message || error
}

export default (state = null, {type, error, payload}) => {
  return type.includes('END') || type.includes('START') ? null
    : error ? formatError(payload) : state
}
