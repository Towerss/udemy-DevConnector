import React, { Fragment } from 'react';
import { Link, withRouter }  from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { logout } from '../../actions/auth';



const Navbar = ({ isAuthenticated, loading, logout, history }  ) => {

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Profiles
        </Link>
      </li>
      <li>
      <i className='fas fa-user' />{' '}
        <Link to="/dashboard">
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={() => logout(history)} href="#!">
          <i className='fas fa-sing-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Profiles</Link></li>
      <li><a href="#!">Developers</a></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {!loading && isAuthenticated ? (<Fragment>{authLinks}</Fragment>) : (<Fragment>{guestLinks}</Fragment>)}
    </nav>
  )
}


Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool.isRequired,
  // loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
