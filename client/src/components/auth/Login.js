import React, { Fragment, useState } from 'react';
import { Link, Redirect }  from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  // Use React hooks useState to handle state. Pass the initial state and the function to update it
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // To get the data from the form
  const { email, password } = formData;

  // Handler to update the state when new data is added
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
      login(email, password);
  }

  /**
   * If user authenticated then redirect
   */
  if(isAuthenticated){
    return <Redirect to='/dashboard'/>
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sing Into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>  
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} 
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)