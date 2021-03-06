import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, isLoggedIn } = props

  return (
    <div className="login-page-container">
      <div className="login-page-text">
        <h1 className="login-welcome">Welcome to Habitlite</h1>
        <p className="login-paragraph">
        Trying to eat healthy? Get in shape? Stop smoking? 
        Look no further! HabitLite is here to help you establish 
        those habits that will lead to your achieving those goals. 
        Customize your habits, earn rewards, and track your progress. 
        HabitLite does it all.</p>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit} name={name} className="form-fields">
          <div className="form-user-name">
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" />
          </div>
          <div className="form-password">
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" />
          </div>
          <div>
            <button className="login-btn" type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
