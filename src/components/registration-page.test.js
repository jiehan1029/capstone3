import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);

import RegistrationPage from './registration-page';

import { shallow } from 'enzyme';

describe('RegistrationPage component',()=>{
	const initialState = {auth:{}};
	const store = mockStore(initialState);
	it('renders without crashing', () => {
	  shallow(<Provider store={store}><RegistrationPage /></Provider>);
	});
});