import React from 'react';
import {connect} from 'react-redux';

import Nav from './nav';

import './header.css';

export function Header(props) {
  // only display navbar when logged in
  let navbar;
  if(props.loggedIn){
    navbar=<Nav />
  }
  return (
    <header>
      <h1>Summer Bucket</h1>
      {navbar}    
    </header>
  );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);
