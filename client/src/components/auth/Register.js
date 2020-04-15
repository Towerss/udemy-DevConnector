import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

// ({ setAlert }) is the destructuring of (props)
const Register = ({ setAlert, register, isAuthenticated }) => {

  // Use React hooks useState to handle state. Pass the initial state and the function to update it
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // To get the data from the form
  const { name, email, password, password2 } = formData;

  // Handler to update the state when new data is added
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email , password });

    }
  };

    /**
   * If user authenticated then redirect
   */
  if(isAuthenticated){
    return <Redirect to='/dashboard'/>
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email 
          </small>
  
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

// Use of connect to connect this Component to the store.
// connect(state, {actions object})
// This allows to access props.action => props.setAlert
export default connect(mapStateToProps, { setAlert, register })(Register);