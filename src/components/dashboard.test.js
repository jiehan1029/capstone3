import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import { mount, shallow } from "enzyme";
import {Provider} from 'react-redux';
import store from '../store';

describe("Dashboard component", () => {

	it('renders without crashing', () => {
		shallow(<Dashboard/>);
	});

  it("renders Redirect when user autheticated", () => {
	  const wrapper = mount(
	  <Provider store={store}>
	    <MemoryRouter initialEntries={[`/dashboard`]}>
	      <Route component={Dashboard} />
	    </MemoryRouter>
	  </Provider>
	  );
  	expect(wrapper.find(Dashboard).props().location.pathname).toBe("/my-bucket");
  });
});