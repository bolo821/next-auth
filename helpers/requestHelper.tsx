import axios from 'axios'
import getConfig from 'next/config'
import { userService } from '../services'
import { saveError } from './'

const { publicRuntimeConfig } = getConfig()

const get = (url, props) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(url)
  }
  return fetch(url, requestOptions).then(handleResponse)
}

const post = (url, body, props) => {
  const config = {
    // headers: { Authorization: `Bearer ${authHeader(url)}` }
  }
  return axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`, body)
  .then(handleResponse)
  .catch(e => {
    console.log('request error', e.response)
    return handleResponse(e.response, props)
  })
}

const put = (url, body, props) => {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', ...authHeader(url)},
    body: JSON.stringify(body)
  }
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${url}`, requestOptions)
    .then((r) => handleResponse(r, props))
    .catch(e => {
      console.log('request error', e.response)
      handleResponse(e.response, props)
    })
}

// prefixed with underscored because delete is a reserved word in javascript
const _delete = (url, props) => {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(url)
  }
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${url}`, requestOptions)
    .then((r) => handleResponse(r, props))
    .catch(e => {
      console.log('request error', e.response)
      handleResponse(e.response, props)
    })
}

// helper consts
const authHeader = (url) => {
  // return auth header with basic auth credentials if user is logged in and request is to the api url
  const user = userService.userValue
  const isLoggedIn = user && user.authdata
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl)
  if (isLoggedIn && isApiUrl) {
    return {Authorization: `Basic ${ user.authdata }`}
  } else {
    return {}
  }
}

const handleResponse = (response, props) => {
  console.log('response undefined')
  if (!response) return undefined
  const data = response.data
  
  if (response.statusText !== '0K') {
    const responseError = data.error
    if ([ 401, 403 ].includes(response.status) && userService.userValue) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      userService.logout()
    }
    const errorToSave = {
      title: `${responseError.name}: ${responseError.message}`,
      code: responseError.status,
      full_error: response,
      path: response.config.url.replace(process.env.NEXT_PUBLIC_STRAPI_URL, ''),
      triggered_by_ip: '',
    }
    saveError(errorToSave)
    return Promise.reject(errorToSave)
  }
  
  return Promise.resolve(data)
}

export const requestHelper = {
  get,
  post,
  put,
  delete: _delete,
}
