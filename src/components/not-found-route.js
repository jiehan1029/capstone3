import React from 'react';
import {Link} from 'react-router-dom';

import './main.css';

export default function NotFoundRoute(props) {
  return (
    <section className="not-found-route">
      <header><h2>Page Not Found</h2></header>
      <p>Sorry, but the URL you entered is not valid. Input another path or <Link to="/dashboard">Go to dashboard</Link>.</p>    
    </section>
  );
}
