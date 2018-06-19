import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import './nav.css';

export class Nav extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    return (
      <nav>
        <ul className="clearfix">
          <li>
            <Link to="/" aria-label="link to dashboard">Welcome, {this.props.username}!</Link>
          </li>
          <li>
            <Link to="/my-bucket" className="my-bucket" aria-label="link to my bucket">My bucket</Link>
          </li>
          <li>
            <Link to="/my-wall" className="my-wall" aria-label="link to my wall">My Wall</Link>
          </li>
          <li>
            <button onClick={() => this.logOut()}>Log out</button>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    username: state.auth.currentUser.username
});

export default connect(mapStateToProps)(Nav);


