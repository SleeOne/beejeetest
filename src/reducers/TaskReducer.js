import {
  TASKS_FAILED, TASKS_FETCHED,
  SORTDIRECTION_CHANGE, SORTFIELD_CHANGE, PAGE_CHANGE,
  TASK_NAME_CHANGE, TASK_EMAIL_CHANGE, TASK_TEXT_CHANGE, NEW_TASK_CREATED, NEW_TASK_FAILED
} from "../types";

const INITIAL_STATE = {
  sortDirection: '',
  sortField: '',
  currentPage: 1,
  data: {
    tasks: [],
    total_task_count: 0
  },
  newTaskName: '',
  newTaskEmail: '',
  newTaskText: ''

}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS_FETCHED: {
      return {...state, data: action.payload}
    }
    case TASKS_FAILED: {
      return {...state}
    }
    case SORTDIRECTION_CHANGE: {
      return {...state, sortDirection: action.payload}
    }
    case SORTFIELD_CHANGE: {
      return {...state, sortField: action.payload}
    }
    case PAGE_CHANGE: {
      return {...state, currentPage: action.payload}
    }
    case TASK_NAME_CHANGE: {
      return {...state, newTaskName: action.payload}
    }
    case TASK_EMAIL_CHANGE: {
      return {...state, newTaskEmail: action.payload}
    }
    case TASK_TEXT_CHANGE: {
      return {...state, newTaskText: action.payload}
    }
    case NEW_TASK_CREATED: {
      return {...state}
    }
    case NEW_TASK_FAILED: {
      return {...state}
    }
    default: {
      return state
    }
  }
}
