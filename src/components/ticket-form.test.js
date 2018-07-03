import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);

import TicketForm from './ticket-form';

import { shallow } from 'enzyme';

describe('TicketForm component',()=>{
	const initialState = {auth:{}};
	const store = mockStore(initialState);
	it('renders without crashing', () => {
		const props={
			legend:"",
			className:"",
			formSubmitStatus:""
		}
	  shallow(<Provider store={store}><TicketForm {...props}/></Provider>);
	});
});