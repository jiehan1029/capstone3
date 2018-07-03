import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

export function Dashboard(props){
  return (
  	<Switch>
  	<Redirect from="/dashboard" to="/my-bucket" />
  	</Switch>
  );
}

export default Dashboard;