import React from 'react';

import Nav from './nav';

import './header.css';

export default function Header(props) {
  // only display navbar when logged in
  let navbar;
  if(this.props.loggedIn){
    navbar=<Nav />
  }
  return (
    <header>
      <h1>App Name</h1>
      {navbar}    
    </header>
  );
}
