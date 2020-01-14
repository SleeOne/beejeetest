import axios from 'axios'
import M from 'materialize-css'


import {
  TASKS_FETCHED, TASKS_FAILED,
  SORTDIRECTION_CHANGE, SORTFIELD_CHANGE, PAGE_CHANGE, TASK_NAME_CHANGE, TASK_EMAIL_CHANGE, TASK_TEXT_CHANGE,
  NEW_TASK_CREATED, NEW_TASK_FAILED,
  TOKEN_FETCHED, TOKEN_FAILED, TOKEN_DELETE, FORM_DATA_CHANGE
} from "../types"

const BASE_URL = `https://uxcandy.com/~shapoval/test-task-backend/v2`
const DEVELOPER = 'pereverzev_viacheslav'
const STORAGE_NAME = 'userData'


const toastMessage = (text) => {
  M.toast({html: text})
}


export const sortDirectionChanged = (text) => {
  return {
    type: SORTDIRECTION_CHANGE,
    payload: text,
  }
}

export const sortFieldChanged = (text) => {
  return {
    type: SORTFIELD_CHANGE,
    payload: text
  }
}

export const changePage = (number) => {
  return {
    type: PAGE_CHANGE,
    payload: number
  }
}


export const getTasks = (params) => async (dispatch) => {
  function onSuccess(success) {
    dispatch({type: TASKS_FETCHED, payload: success})
    return success
  }

  function onError(error) {
    dispatch({type: TASKS_FAILED, payload: error})
  }

  try {

    const res = await axios.get(`${BASE_URL}/`, {
      params: {
        developer: DEVELOPER,
        ...params
      }
    })

    const success = await res.data.message
    onSuccess(success)

  } catch (error) {
    onError(error)
  }
}


export const taskNameChanged = (text) => {
  return {
    type: TASK_NAME_CHANGE,
    payload: text,
  }
}
export const taskEmailChanged = (text) => {
  return {
    type: TASK_EMAIL_CHANGE,
    payload: text,
  }
}
export const taskTextChanged = (text) => {
  return {
    type: TASK_TEXT_CHANGE,
    payload: text,
  }
}

export const createTask = ({username, email, text}) => async (dispatch) => {
  function onSuccess(success) {
    if (success.status === 'ok') {
      dispatch({type: NEW_TASK_CREATED, payload: success.message})
      toastMessage('Задача создана!')
    } else {
      onError(success)
    }
    return success
  }

  function onError(error) {
    dispatch({type: NEW_TASK_FAILED, payload: error})
    toastMessage(JSON.stringify(error))
  }

  try {
    let formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('text', text)

    const res = await axios.post(
      `${BASE_URL}/create`,
      formData,
      {
        params: {developer: DEVELOPER},
        headers: {'Content-Type': 'multipart/form-data'},
      }
    )
    const success = await res.data
    onSuccess(success)

  } catch (error) {
    onError(error)
  }
}

export const login = ({username, password}) => async (dispatch) => {
  function onSuccess(success) {
    if (success.status === 'ok') {
      const token = success.message.token
      localStorage.setItem(STORAGE_NAME, JSON.stringify({token: token}))
      dispatch({type: TOKEN_FETCHED, payload: token})
    } else onError(success)
  }

  function onError(error) {
    toastMessage(JSON.stringify(error))
    dispatch({type: TOKEN_FAILED, payload: error})
  }

  try {
    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const res = await axios.post(
      `${BASE_URL}/login`,
      formData,
      {
        params: {developer: DEVELOPER},
        headers: {'Content-Type': 'multipart/form-data'},
      }
    )
    const success = await res.data
    onSuccess(success)
  } catch (error) {
    onError(error)
  }

}

export const formDataChanged = (form) => {
  return {
    type: FORM_DATA_CHANGE,
    payload: form,
  }
}


export const getTokenFromStorage = () => (dispatch) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_NAME))
  if (data && data.token) {
    dispatch({type: TOKEN_FETCHED, payload: data.token})
  } else {
    dispatch({type: TOKEN_FETCHED, payload: ''})
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem(STORAGE_NAME)
  dispatch({type: TOKEN_DELETE})
}

export const editTask = ({id, status, text}) => async (dispatch) => {
  function onSuccess(success) {
    return success
  }

  function onError(error) {
    localStorage.removeItem(STORAGE_NAME)
    dispatch({type: TOKEN_DELETE})
    toastMessage(error)
    return error
  }

  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME))
    if (data && data.token) {
      let formData = new FormData()
      formData.append('token', data.token)
      if (status != undefined) formData.append('status', status)
      if (text != undefined) formData.append('text', `${text} (отредактировано администратором)`)

      const res = await axios.post(
        `${BASE_URL}/edit/${id}`,
        formData,
        {
          params: {developer: DEVELOPER},
          headers: {'Content-Type': 'multipart/form-data'},
        }
      )
      const success = await res.data
      if(success.status === 'ok')
        onSuccess(success)
      else onError(success)
    }
    else onError('Вы не авторизованы')

  } catch (error) {
    onError(error)
  }
}
