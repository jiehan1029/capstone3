import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);

import MomentCollection from './moment-collection';

import { shallow } from 'enzyme';

describe('MomentCollection component',()=>{
	const initialState = {};
	const store = mockStore(initialState);
	it('renders without crashing', () => {
		const props={
			records:[]
		}
	  shallow(<Provider store={store}><MomentCollection {...props}/></Provider>);
	});
});