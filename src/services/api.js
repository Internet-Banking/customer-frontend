import axios from 'axios'
import {API_URL} from '../constants'

const METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

class BaseApi {
  baseMethod = async (method, pathName, body, authorizationToken) => {
    const headers = authorizationToken ? {Authorization: `Bearer ${authorizationToken}`} : null
    return axios({
      method,
      url: `${API_URL}/${pathName}`,
      data: body,
      headers
    })
      .then((response) => {
        return {isSuccess: true, data: response.data}
      })
      .catch((error) => {
        return {isSuccess: false, error: error.response.data}
      })
  }

  get = (pathName, body = undefined, token = undefined) =>
    this.baseMethod(METHOD.GET, pathName, body, token)

  post = (pathName, body = undefined, token = undefined) =>
    this.baseMethod(METHOD.POST, pathName, body, token)

  put = (pathName, body = undefined, token = undefined) =>
    this.baseMethod(METHOD.PUT, pathName, body, token)

  patch = (pathName, body = undefined, token = undefined) =>
    this.baseMethod(METHOD.PATCH, pathName, body, token)

  delete = (pathName, body = undefined, token = undefined) =>
    this.baseMethod(METHOD.DELETE, pathName, body, token)
}

const api = new BaseApi()

export default api
