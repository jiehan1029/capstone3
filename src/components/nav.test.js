import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {BrowserRouter as Router} from 'react-router-dom';

import Nav from './nav';

import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);


it('renders without crashing', () => {

  const initialState = {
  	auth:{
  		currentUser:{
  			username:'testUser'
  		}
  	}
  };
  const store = mockStore(initialState);

  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Nav />
      </Router>
    </Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
