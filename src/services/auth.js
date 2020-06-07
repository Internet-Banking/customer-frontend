// import LocalStorage from './storage/local'
// import SessionStorage from './storage/session'
import {LocalStorage, SessionStorage} from './'

const saveToken = (token, isLongTerm) => {
  SessionStorage.setItem('token', token)
  if (isLongTerm || LocalStorage.getItem('token')) LocalStorage.setItem('token', token)
}

const getToken = () => {
  return LocalStorage.getItem('token') || SessionStorage.getItem('token')
}

const removeToken = () => {
  SessionStorage.removeItem('token')
  LocalStorage.removeItem('token')
}

export default {saveToken, getToken, removeToken}