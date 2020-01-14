import React, {Component} from 'react'

import M from 'materialize-css'

import {connect} from 'react-redux'
import {
  getTasks, sortDirectionChanged, sortFieldChanged, changePage,
  taskNameChanged, taskEmailChanged, taskTextChanged, createTask,
  getTokenFromStorage
} from '../actions'

import {List, Pagination, Header} from '../components'

class HomePage extends Component {

  _getTasksWithParams = () => {
    const {sortField, sortDirection, currentPage} = this.props
    let params = {}

    if (sortField)
      params.sort_field = sortField
    if (sortDirection)
      params.sort_direction = sortDirection

    params.page = currentPage

    this.props.getTasks(params)
  }

  componentDidMount() {
    this._getTasksWithParams()
    this.props.getTokenFromStorage()
  }

  componentDidUpdate() {
    M.AutoInit()
    console.log('props', this.props)
  }

  _clearInputFields = () => {
    this.props.taskNameChanged('')
    this.props.taskEmailChanged('')
    this.props.taskTextChanged('')
  }

  _changeSortFieldHandler = async (value) => {
    await this.props.sortFieldChanged(value)
    await this._getTasksWithParams()
  }
  _changeSortDirectionHandler = async (value) => {
    await this.props.sortDirectionChanged(value)
    await this._getTasksWithParams()
  }
  _changePage = async (number) => {
    await this.props.changePage(number)
    await this._getTasksWithParams()
  }



  _taskNameHandler = (event) => {
    this.props.taskNameChanged(event.target.value)
  }
  _taskEmailHandler = (event) => {
    this.props.taskEmailChanged(event.target.value)
  }
  _taskTextHandler = (event) => {
    this.props.taskTextChanged(event.target.value)
  }
  _createTaskHandler = () => {
    const {newTaskName, newTaskEmail, newTaskText} = this.props
    console.log(newTaskName, newTaskEmail, newTaskText)
    this.props.createTask({username: newTaskName, email: newTaskEmail, text: newTaskText})
    this._clearInputFields()

  }

  render() {
    const {data} = this.props
    return (
      <div style={{margin: 20}}>
        <Header/>
        <div className={'card blue-grey darken-1 white-text'} style={{padding: 20}}>
          <div>
            <h3>Новая задача</h3>
            <input placeholder="Имя" value={this.props.newTaskName} onChange={this._taskNameHandler}/>
            <input placeholder="Емейл" value={this.props.newTaskEmail} onChange={this._taskEmailHandler}/>
            <input placeholder="Текст" value={this.props.newTaskText} onChange={this._taskTextHandler}/>
          </div>
          <div>
            <button className={'btn waves-effect waves-light'} onClick={this._createTaskHandler}>Создать</button>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className="input-field">
            <select defaultValue={this.props.sortField}
                    onChange={(e) => {
                      return this._changeSortFieldHandler(e.target.value)
                    }}
            >
              <option value="" disabled>Выбрать</option>
              <option value="username">Имя</option>
              <option value="email">Емейл</option>
              <option value="status">Статус</option>
            </select>
            <label>Имя/Емейл/Статус</label>
          </div>

          <div className="input-field">
            <select defaultValue={this.props.sortDirection}
                    onChange={(e) => {
                      return this._changeSortDirectionHandler(e.target.value)
                    }}
            >
              <option value="" disabled>Выбрать</option>
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>

            </select>
            <label>Возр/Убыв</label>
          </div>

          <button
            className={"btn waves-effect waves-light"}
            onClick={() => {
              this._getTasksWithParams()
            }}
          >Обновить
          </button>
        </div>

        <div>
          {
            data
              ? <List tasks={data.tasks}/>
              : <div>Wait for load data</div>
          }
          <Pagination
            page={this.props.currentPage}
            maxPages={Math.ceil(this.props.data.total_task_count / 3)}
            onChangePage={this._changePage}
          />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.tasks.data,
    sortField: state.tasks.sortField,
    sortDirection: state.tasks.sortDirection,
    currentPage: state.tasks.currentPage,

    newTaskName: state.tasks.newTaskName,
    newTaskEmail: state.tasks.newTaskEmail,
    newTaskText: state.tasks.newTaskText,
    token: state.auth.token
  }
}

const mapDispatchToProps = {
  getTasks, sortDirectionChanged, sortFieldChanged, changePage,
  taskNameChanged, taskEmailChanged, taskTextChanged, createTask,
  getTokenFromStorage
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
