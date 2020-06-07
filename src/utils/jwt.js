import {TOKEN_EXPIRED_SOON_IN_MS, TOKEN_STATE} from '../constants'

const getTokenState = (token) => {
  let payload
  try {
    payload = JSON.parse(window.atob(token.split('.')[1]))
  }
  catch (err) {
    return TOKEN_STATE.INVALID
  }

  const expiredAt = payload.exp * 1000
  const now = Date.now()

  if (expiredAt < now) {
    return TOKEN_STATE.EXPIRED
  }
  else if (expiredAt < now + TOKEN_EXPIRED_SOON_IN_MS) {
    return TOKEN_STATE.EXPIRE_SOON
  }

  return TOKEN_STATE.ALIVE
}

export default {getTokenState}
