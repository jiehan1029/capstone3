import React from 'react';

import './nav.css';

export default function Nav(props) {
  return (
    <nav>
      <ul className="clearfix">      
        <li>
          <a 
            href="#my-bucket" 
            className="my-bucket"
            aria-label="my bucket"
          >
            My bucket
          </a>
        </li>
        <li>
          <a
            href="#my-wall"
            className="my-wall"
            aria-label="my wall"
          >
            My Wall
          </a>
        </li>
      </ul>
    </nav>
  );
}