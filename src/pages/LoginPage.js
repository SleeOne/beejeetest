import React, {Component} from 'react'
import {Link, Switch, Redirect} from 'react-router-dom'
import {login, formDataChanged} from '../actions'

import {connect} from "react-redux";


class LoginPage extends Component {
  render() {
    const {formData, formDataChanged} = this.props

    const _clearInputFields = () => {
      formDataChanged({username: '', password: ''})
    }

    const _changeHandler = event => {
      formDataChanged({...formData, [event.target.name]: event.target.value})
    }

    const _loginHandler = async () => {
      await this.props.login(formData)
      _clearInputFields()
    }

    if(!!this.props.token)
      return (
          <Switch>
            <Redirect to='/'/>
          </Switch>
      )
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 0.3}}>
        <div>
          <h2>Авторизация</h2>

          <div className="input-field">
            <input type="text"
                   name={'username'}
                   id={'username'}
                   value={formData.username}
                   onChange={_changeHandler}
                   className="validate"
            />
            <label>Логин</label>
          </div>
          <div className="input-field">
            <input type="password"
                   name={'password'}
                   id={'password'}
                   value={formData.password}
                   onChange={_changeHandler}
                   className="validate"
            />
            <label>Пароль</label>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Link to={'/'}>
              <button className={'btn waves-effect waves-light red'} style={{marginRight: 10}}>Отмена</button>
            </Link>
            <button onClick={_loginHandler} className={'btn waves-effect waves-light'}>Войти</button>
          </div>

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    formData: state.auth.formData
  }
}

const mapDispatchToProps = {
  login,
  formDataChanged
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

