import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LoginForm from './login-form';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
      return <Redirect to="/dashboard" />;
  }  
  return (
    <section className='landing-page'>
      <div className='description'>
        <header><h2>Summer is here!</h2></header>
        <p>Let your kids fill up a summer bucket with fun activity ideas</p>
        <p>Anytime when bored, simply pick a random activity ticket from the bucket</p>
        <p>Keep engaged all summer long and post photos on your wall!</p>
      </div>
      <div className='login-section'>
        <LoginForm />
      </div>      
    </section>
  );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);