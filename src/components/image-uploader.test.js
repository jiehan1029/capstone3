import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);

import {BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
import ImageUploader from './image-uploader';

import { mount } from "enzyme";

describe("ImageUploader component", () => {

  const initialState = {protectedData:{}};
  const store = mockStore(initialState);

	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(
	  	<Provider store={store}>
	  		<Router>
	  			<ImageUploader />
	  		</Router>
	  	</Provider>
	  , div);
	  ReactDOM.unmountComponentAtNode(div);
	});
});