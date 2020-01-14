import React from 'react'


import {useSelector, useDispatch} from "react-redux"
import {editTask} from "../actions"


const List = ({tasks}) => {
  const store = useSelector(store => store)
  const dispatch = useDispatch()


  const _statusHandler = ({id, status}) => {
    if (status === 0) dispatch(editTask({id, status: 10}))
    if (status === 10) dispatch(editTask({id, status: 0}))
  }

  const _changeTextHandler = (id, oldText, newText) => {
    if(oldText !== newText) dispatch(editTask({id, text: newText}))
  }



  if (!!store.auth.token)
    return (
      <ul>
        <h3>Admin</h3>
        {
          tasks.map((item) => {
            return (
              <li key={item.id}>
                <div className="row" style={{padding: 10, border: '1px solid'}}>

                  <p><b>Пользователь:</b> {item.username}</p>
                  <p><b>Email: </b><a href={`mailto:${item.email}`}>{item.email}</a></p>

                  <div className="row">
                    <b>Задача: </b>
                    <div className="input-field">
                      <textarea defaultValue={item.text} name={`ta${item.id}`} className="materialize-textarea"></textarea>
                      <button className={'btn waves-effect waves-light'} onClick={()=>{
                        const newText = document.getElementsByName(`ta${item.id}`)[0].value
                        _changeTextHandler(item.id, item.text, newText)
                      }}>Сохранить</button>
                    </div>

                  </div>

                  <p style={{display: 'flex', alignItems: 'center'}}>
                    <b>Статус:</b>
                    <label style={{marginLeft: 20}}>
                      <input type="checkbox" checked={item.status === 10 ? 'checked' : ''} onChange={event => {
                        _statusHandler(item)
                      }}/>
                      <span></span>
                    </label>
                  </p>

                </div>
              </li>
            )
          })
        }
      </ul>
    )

  else
    return (
      <ul>
        {
          tasks.map((item) => {
            return (
              <li key={item.id}>
                <div className="row blue-grey darken-1 white-text" style={{padding: 10}}>

                  <p><b>Пользователь:</b> {item.username}</p>
                  <p><b>Email: </b><a className={'white-text'} href={`mailto:${item.email}`}>{item.email}</a></p>
                  <p><b>Задача: </b> {item.text}</p>
                  <p><b>Статус:</b> {item.status === 10 ? "Выполнено" : "Не выполнено"}</p>

                </div>
              </li>
            )
          })
        }
      </ul>
    )
}


export {List}
