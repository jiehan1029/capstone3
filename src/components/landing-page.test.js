import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);

import {BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
import LandingPage from './landing-page';

import { mount } from "enzyme";

describe("Landing page component", () => {

	it('renders without crashing', () => {
	  const div = document.createElement('div');

	  const initialState = {auth:{}};
	  const initStore = mockStore(initialState);

	  ReactDOM.render(
	  	<Provider store={initStore}>
	  		<Router>
	  			<LandingPage />
	  		</Router>
	  	</Provider>
	  , div);
	  ReactDOM.unmountComponentAtNode(div);
	});

  it("renders Redirect when user autheticated", () => {
	  const loggedInState = {
	  	auth:{
	  		currentUser:{
	  			username:'testUser'
	  		}
	  	}
	  };
		const loggedInStore = mockStore(loggedInState);
	  const wrapper = mount(
	  	<Provider store={loggedInStore}>
	    <MemoryRouter initialEntries={[`/`]}>
	      <Route component={LandingPage} />
	    </MemoryRouter>
	    </Provider>
	  );
  	expect(wrapper.find(LandingPage).props().location.pathname).toBe("/dashboard");
  	
  });
});