import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export class Nav extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    return (
      <nav>
        <ul>
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
            <a onClick={() => this.logOut()}>Log out</a>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
    username: state.auth.currentUser.username
});

export default connect(mapStateToProps)(Nav);


