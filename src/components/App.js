import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import LandingPage from './landing-page';

import './App.css';

class App extends Component {
  render() {
  /*  
  const testTickets=[
		{what:"grow plants", where:"garden", details:"plant flowers"},
		{what:"visit museum", where:"discovery museum", details:"museum display"},
		{what:"water splash", where:"backyard", details:"water table"}
	];

	const circleStatus=[
		{status:"completed",who:"James",where:"pool",what:"pool party",details:"pool party",when:Date()},
		{status:"wanted",who:"Lily",where:"library",what:"homework",details:"exam prep"}
	];
  */
    return (
      <div>
      <Header />
      <Router>
        <main>
          <Route path="/" component={LandingPage}/> 
        </main>
      </Router>
      <Footer />
      </div>
    );
  }
}

export default App;
