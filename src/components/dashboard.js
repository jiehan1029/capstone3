import React from 'react';
import {Redirect} from 'react-router-dom';
import requiresLogin from './requires-login';

export function Dashboard(props){
  return <Redirect to="/my-bucket" />;
}

export default requiresLogin()(Dashboard);
