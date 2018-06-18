import React from 'react';

import './landing-page.css';

import LoginForm from './login-form';

export default function LandingPage(props) {
  return (
    <section>
      <section className='description-section'>
        <h2>Summer is here!</h2>
        <p>Let your kids checkout their summer buckets for fun activities that engage them all summer long!</p>
        <p>Create an account or login with <strong>demoUser</strong> and <strong>demoPassword</strong> to: </p>    
        <ul>
          <li>Add your favorite activity *ticket* into the bucket</li>
          <li>View all tickets you created, pick one to do, or</li>
          <li>Let the app pick a ticket for you, randomly</li>
          <li>Log all tickets you completed to create a collection full of fun memories!</li>
        </ul>
      </section>
      <section className='login-section'>
        <LoginForm />
      </section>      
    </section>
  );
}