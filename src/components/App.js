import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Header from './header';
import MyBucket from './my-bucket';

import './App.css';

class App extends Component {
  render() {
  const testTickets=[
		{what:"grow plants", where:"garden", details:"plant flowers"},
		{what:"visit museum", where:"discovery museum", details:"museum display"},
		{what:"water splash", where:"backyard", details:"water table"}
	];

	const circleStatus=[
		{status:"completed",who:"James",where:"pool",what:"pool party",details:"pool party",when:Date()},
		{status:"wanted",who:"Lily",where:"library",what:"homework",details:"exam prep"}
	];

    return (
      <Router>
      	<div>
          <Header />
          <main>
            <Route exact path="/" component={MyBucket} tickets={testTickets}/> 
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
