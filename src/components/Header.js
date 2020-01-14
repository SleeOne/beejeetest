import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {logout} from "../actions"


const Header = () => {
  const store = useSelector(store => store)
  const dispatch = useDispatch()

  return <div className={"blue-grey darken-1 white-text"} style={style}>
    <p>Задачи</p>
    {!store.auth.token
      ?
      <Link to='/login'>
        <button className={"btn waves-effect waves-light"}>Login</button>
      </Link>
      :
      <button onClick={()=>{dispatch(logout())}} className={"btn waves-effect waves-light red"}>Logout</button>
    }

  </div>
}

const style = {minHeight: 60, paddingRight: 20, paddingLeft: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}
export {Header}
