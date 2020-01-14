import {combineReducers} from "redux"

import TaskReducer from "./TaskReducer"
import AuthReducer from './AuthReducer'

export default combineReducers({
  tasks: TaskReducer,
  auth: AuthReducer
})
