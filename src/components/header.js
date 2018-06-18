import React from 'react';

import Nav from './nav';

import './header.css';

export default function Header(props) {
  return (
    <header>
      <h1>App Name</h1>
      <Nav />      
    </header>
  );
}