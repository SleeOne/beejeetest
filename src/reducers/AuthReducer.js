import {TOKEN_FETCHED, TOKEN_FAILED, TOKEN_DELETE, FORM_DATA_CHANGE} from "../types"


const INITIAL_STATE = {
  token: '',
  formData: {
    username: '',
    password: ''
  }
}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOKEN_FETCHED: {
      return {...state, token: action.payload}
    }
    case TOKEN_FAILED: {
      return {...state}
    }
    case TOKEN_DELETE: {
      return {...state, token: ''}
    }
    case FORM_DATA_CHANGE: {
      return {...state, formData: action.payload}
    }


    default: return state
  }
}
