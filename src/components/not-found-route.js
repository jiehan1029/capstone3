import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFoundRoute(props) {
  return (
    <section>
      <h2>Page Not Found</h2>
      <p>Sorry, but the URL you entered is not valid. Input another path or <Link to="/dashboard">Go to dashboard</Link>.</p>    
    </section>
  );
}
